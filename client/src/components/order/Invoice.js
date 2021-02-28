import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

const Invoice = ({ order }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        ~ {new Date().toLocaleString()} ~
      </Text>
      <Text style={styles.title}>Order Invoice</Text>
      <Text style={styles.author}>Ever Glow Store</Text>
      <Text style={styles.subtitle}>Order Summary</Text>

      <Table>
        <TableHeader>
          <TableCell
            style={{
              fontSize: 14,
              fontWeight: 900,
              textAlign: "center",
              padding: 5,
            }}
          >
            Title
          </TableCell>
          <TableCell
            style={{
              fontSize: 14,
              fontWeight: 900,
              textAlign: "center",
              padding: 5,
            }}
          >
            Price
          </TableCell>
          <TableCell
            style={{
              fontSize: 14,
              fontWeight: 900,
              textAlign: "center",
              padding: 5,
            }}
          >
            Quantity
          </TableCell>
          <TableCell
            style={{
              fontSize: 14,
              fontWeight: 900,
              textAlign: "center",
              padding: 5,
            }}
          >
            Brand
          </TableCell>
          <TableCell
            style={{
              fontSize: 14,
              fontWeight: 900,
              textAlign: "center",
              padding: 5,
            }}
          >
            Color
          </TableCell>
        </TableHeader>
      </Table>

      <Table data={order.products}>
        <TableBody>
          <DataTableCell
            style={{ textAlign: "center", padding: 3 }}
            getContent={(x) => x.product.title}
          />
          <DataTableCell
            style={{ textAlign: "center", padding: 3 }}
            getContent={(x) => `${x.product.price} Rs`}
          />
          <DataTableCell
            style={{ textAlign: "center", padding: 3 }}
            getContent={(x) => x.count}
          />
          <DataTableCell
            style={{ textAlign: "center", padding: 3 }}
            getContent={(x) => x.product.brand}
          />
          <DataTableCell
            style={{ textAlign: "center", padding: 3 }}
            getContent={(x) => x.product.color}
          />
        </TableBody>
      </Table>

      <Text style={styles.text}>
        <Text style={{ paddingTop: 10 }}>
          Order Date : {new Date(order.paymentIntent.created).toLocaleString()}
        </Text>
        {"\n\n"}
        <Text style={{ color: "white", textAlign: "center", margin: 30 }}>
          Order Id : {order.paymentIntent.id}
        </Text>
        {"\n\n"}
        <Text> Customer Name : {order.name}</Text>
        {"\n\n"}
        <Text> Contact Number : {order.contactNumber}</Text>
        {"\n\n"}
        <Text> User Email : {order.UserEmail}</Text>
        {"\n\n"}
        <Text> User Location : {order.UserLocation}</Text>
        {"\n\n"}
        <Text> Customer Address :</Text>
        {"\n"}
        <Text>{order.address}</Text>
        {"\n\n"}
        <Text> Order Status : {order.orderStatus}</Text>
        {"\n\n"}
        <Text> Total Paid : {order.paymentIntent.amount}</Text>
      </Text>

      <Text style={styles.footer}> ~ Thank you for shopping with us ~ </Text>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    paddingBottom: 8,
  },
  text: {
    margin: 20,
    fontSize: 14,
    textAlign: "justify",
    paddingTop: 10,
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    padding: "100px",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export default Invoice;
