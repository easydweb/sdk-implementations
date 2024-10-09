import express, { Express, Request, Response } from 'express';
import { auth, resolver, protocol } from '@iden3/js-iden3-auth';
import getRawBody from 'raw-body';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

const app: Express = express();
const port = process.env.VERIFIER_BACKEND_PORT;

app.get("/api/sign-in", (req, res) => {
    console.log("get Auth Request");
    getAuthRequest(req, res);
});

app.post("/api/callback", (req, res) => {
    console.log("callback");
    callback(req, res);
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

const requestMap = new Map();
const shortUrlMap = new Map<string, any>();

async function getAuthRequest(req: Request, res: Response) {
    const hostUrl = process.env.VERIFIER_BACKEND_HOST;
    const sessionId = uuidv4();  // Generate a unique UUID for the session
    const callbackURL = "/api/callback";
    const audience =
        process.env.VERIFIER_BACKEN_AMOY_SENDER_DID;

    const uri = `${hostUrl}${callbackURL}?sessionId=${sessionId}`;

    const request = auth.createAuthorizationRequest("test flow", audience as string, uri);

    const requestId = uuidv4();
    const requestThid = uuidv4();
    request.id = requestId;
    request.thid = requestThid;

    const proofRequest = {
        "circuitId": "credentialAtomicQuerySigV2",
        "id": Date.now(),
        "query": {
            "allowedIssuers": [
                "*"
            ],
            "context": "ipfs://QmdH1Vu79p2NcZLFbHxzJnLuUHJiMZnBeT7SNpLaqK7k9X",
            "type": "POAP01",
            "credentialSubject": {
                "city": {
                    "$eq": "mum"
                }
            }
        }
    };

    const scope = request.body.scope ?? [];
    request.body.scope = [...scope, proofRequest];

    requestMap.set(sessionId, request);

    const base64Message = btoa(JSON.stringify(request));

    const shortId = crypto.randomBytes(8).toString('hex');
    const shortenedUrl = `${hostUrl}/requestjson/${shortId}`;
    shortUrlMap.set(shortId, request);

    const response = {
        request: request,
        encodedURI: `iden3comm://?i_m=${base64Message}`,
        shortenURL: `iden3comm://?request_uri=${shortenedUrl}`
    }
    return res.status(200).set("Content-Type", "application/json").send(response);
}

async function callback(req: Request, res: Response) {
    const sessionId = req.query.sessionId;

    const raw = await getRawBody(req);
    const tokenStr = raw.toString().trim();

    const ethURL = process.env.VERIFIER_BACKEND_AMOY_RPC;
    const contractAddress = "0x1a4cC30f2aA0377b0c3bc9848766D90cb4404124";
    const keyDIR = "../keys";
    const ethStateResolver = new resolver.EthStateResolver(
        ethURL as string,
        contractAddress
    );

    const resolvers = {
        ["polygon:amoy"]: ethStateResolver,
    };
    const authRequest = requestMap.get(`${sessionId}`);

    const verifier = await auth.Verifier.newVerifier({
        stateResolver: resolvers,
        circuitsDir: path.join(__dirname, keyDIR),
        ipfsGatewayURL: "https://ipfs.io",
    });
    try {
        const opts = {
            acceptedStateTransitionDelay: 5 * 60 * 1000, // 5 minute
        };
        const authResponse = await verifier.fullVerify(tokenStr, authRequest, opts);
        return res
            .status(200)
            .set("Content-Type", "application/json")
            .send(authResponse);
    } catch (error) {
        return res.status(500).send(error);
    }
}

app.get("/requestjson/:shortId", (req, res) => {
    const shortId = req.params.shortId;
    const request = shortUrlMap.get(shortId);

    if (request) {
        res.json(request);
    } else {
        res.status(404).send("Short URL not found");
    }
});

