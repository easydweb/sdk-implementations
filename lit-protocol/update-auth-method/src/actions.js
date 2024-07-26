export const litActionA = `(async () => {
    const accessControlConditions = [
      {
        contractAddress: "",
        standardContractType: "",
        chain: "ethereum",
        method: "",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: "=",
          value: "0x48e6a467852Fa29710AaaCDB275F85db4Fa420eB",
        },
      },
    ];
  
    const testResult = await Lit.Actions.checkConditions({
      conditions: accessControlConditions,
      authSig: JSON.parse(authSig),
      chain: "ethereum",
    });
  
    if (!testResult) {
      LitActions.setResponse({
        response: "Address is not authorized",
      });
      return;
    }
  
    LitActions.setResponse({
      response: "true",
    });
  })();
  `;

export const litActionB = `(async () => {
    const accessControlConditions = [
      {
        contractAddress: "",
        standardContractType: "",
        chain: "ethereum",
        method: "",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: "=",
          value: "0x291B0E3aA139b2bC9Ebd92168575b5c6bAD5236C",
        },
      },
    ];
  
    const testResult = await Lit.Actions.checkConditions({
      conditions: accessControlConditions,
      authSig: JSON.parse(authSig),
      chain: "ethereum",
    });
  
    if (!testResult) {
      LitActions.setResponse({
        response: "Address is not authorized",
      });
      return;
    }
  
    LitActions.setResponse({
      response: "true",
    });
  })();
  `;
