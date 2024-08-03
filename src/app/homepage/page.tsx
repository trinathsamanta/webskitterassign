import Image from "next/image";
import { Container, Typography } from "@mui/material";
import ProductTable from "../component/homecomponent/producttable";

export default function Home() {
  return (
    <Container>
      <Typography variant="h1" component="h2">
        Product Table
      </Typography>
      <ProductTable />
    </Container>
  );
}