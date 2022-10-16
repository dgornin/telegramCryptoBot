import { useRouter } from "next/router";
import { Button } from "semantic-ui-react";
import Layout from "../components/Layout";

export default function Index() {
  const router = useRouter();
  return (
    <Layout>
      <h4>
        Here you can live your notes in blockchain, and be sure that they will be saved
      </h4>
    </Layout>
  );
};
