import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ERC20Tab from "./ERC20Tab";
import ERC721Tab from "./ERC721Tab";
import ERC1155Tab from "./ERC1155Tab";

export default function TokenTabs(): JSX.Element {
  return (
    <section className=" grid place-items-center" id="tabs">
      <Tabs
        defaultValue="20"
        className=" flex flex-col justify-center items-center"
      >
        <TabsList>
          <TabsTrigger value="20">ERC-20</TabsTrigger>
          <TabsTrigger value="721">ERC-721</TabsTrigger>
          <TabsTrigger value="1155">ERC-1155</TabsTrigger>
        </TabsList>
        <TabsContent value="20">
          <ERC20Tab />
        </TabsContent>
        <TabsContent value="721">
          <ERC721Tab />
        </TabsContent>
        <TabsContent value="1155">
          <ERC1155Tab />
        </TabsContent>
      </Tabs>
    </section>
  );
}
