import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { TextInput } from "react-native-paper";

const FormikTextField = () => {
  const [modal, setModal] = useState(false);
  const [loanEmi, setLoanEmi] = useState("");
  const [interestPayable, setInterestPayable] = useState("");
  const [totalPayment, setTotalPayment] = useState("");
  const [editable, setEditable] = useState(true);
  const calculate = (amount, tenure, rate) => {
    const interest = rate / 12 / 100;

    const top = Math.pow(1 + interest, tenure);
    const bottom = top - 1;
    const ratio = top / bottom;
    const EMI = amount * interest * ratio;
    setLoanEmi(EMI.toFixed(0));
    const total_payables = Math.floor(EMI * tenure);
    const interest_payable = total_payables - amount;
    setInterestPayable(interest_payable);
    setTotalPayment(total_payables);
  };

  const validationSchema = yup.object().shape({
    amount: yup.string().required().max(15),
    tenure: yup.string().required("Months is required").max(15),
    rate: yup.string().required("Interest rate is required").max(2),
  });
  return (
    <View style={styles.container}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ amount: "", tenure: "", rate: "" }}
        onSubmit={(values) => {
          const { amount, tenure, rate } = values;

          calculate(amount, tenure, rate);
          setModal(true);
          setEditable(false);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldTouched,
          resetForm,
        }) => (
          <>
            <View style={styles.textInputField}>
              <Text style={{ flex: 1, fontSize: 14 }}>Loan Amount</Text>
              <TextInput
                name="amount"
                placeholder="Enter Amount"
                style={styles.textInput}
                onChangeText={handleChange("amount")}
                onBlur={() => setFieldTouched("amount")}
                value={values.amount}
                keyboardType="numeric"
                editable={editable}
                mode="outlined"
              />
              <Text style={{ flex: 1, fontSize: 14 }}>INR</Text>
            </View>
            {errors.amount && touched.amount && (
              <Text style={styles.errorMessage}>{errors.amount}</Text>
            )}
            <View style={styles.textInputField}>
              <Text style={{ flex: 1, fontSize: 14 }}>Loan Tenure</Text>

              <TextInput
                name="tenure"
                placeholder="Enter in Months"
                style={styles.textInput}
                onChangeText={handleChange("tenure")}
                onBlur={() => setFieldTouched("tenure")}
                value={values.tenure}
                keyboardType="numeric"
                editable={editable}
                mode="outlined"
              />
              <Text style={{ flex: 1, fontSize: 14 }}>Months</Text>
            </View>
            {errors.tenure && touched.tenure && (
              <Text style={styles.errorMessage}>{errors.tenure}</Text>
            )}

            <View style={styles.textInputField}>
              <Text style={{ flex: 1, fontSize: 14 }}> Interest Rate</Text>
              <TextInput
                name="rate"
                placeholder="NN. NN"
                style={styles.textInput}
                onChangeText={handleChange("rate")}
                onBlur={() => setFieldTouched("rate")}
                value={values.rate}
                keyboardType="numeric"
                editable={editable}
                mode="outlined"
              />
              <Text style={{ flex: 1 }}>%</Text>
            </View>
            {errors.rate && touched.rate && (
              <Text style={styles.errorMessage}>{errors.rate}</Text>
            )}

            {!modal ? (
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text
                  style={{ fontSize: 18, fontWeight: "600", color: "white" }}
                >
                  Calculate
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setModal(false);
                  resetForm();
                  setLoanEmi("");
                  setInterestPayable("");
                  setTotalPayment("");
                  setEditable(true);
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "600", color: "white" }}
                >
                  Reset
                </Text>
              </TouchableOpacity>
            )}
            {modal && (
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 40,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "300",
                    color: "#2818dd",
                  }}
                >
                  Loan EMI Calculator
                </Text>
                <View
                  style={{
                    width: "100%",
                    marginHorizontal: 10,
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginTop: 10,
                  }}
                >
                  <View
                    style={[styles.boxView, { backgroundColor: "#FFE8A7" }]}
                  >
                    <Text style={styles.title}>Loan EMI</Text>
                    <Text style={styles.totalAmount}>
                      {"\u20B9"}
                      {loanEmi.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Text>
                  </View>
                  <View
                    style={[styles.boxView, { backgroundColor: "#E3FFFD" }]}
                  >
                    <Text style={styles.title}>Total Interest Payable</Text>
                    <Text style={styles.totalAmount}>
                      {"\u20B9"}
                      {interestPayable
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Text>
                  </View>
                </View>
                <View style={styles.totalPayment}>
                  <Text style={styles.title}>
                    Total Payment (Principal+ Interest)
                  </Text>
                  <Text style={styles.totalAmount}>
                    {"\u20B9"}
                    {totalPayment
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Text>
                </View>
              </View>
            )}
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  textInputField: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  textInput: {
    fontSize: 16,
    width: "60%",
    height: 40,
    padding: 5,
    margin: 5,
    borderRadius: 3,
    flex: 2,
  },
  calculateButton: {
    borderColor: "#293A64",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#293A64",
    height: 50,
    width: "80%",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    position: "absolute",
    bottom: 60,

    marginTop: 50,
    width: "100%",
  },
  totalAmount: {
    fontSize: 15,
    fontWeight: "bold",
  },
  title: {
    fontSize: 17,
    fontWeight: "400",
  },
  errorMessage: {
    fontSize: 12,
    color: "red",
  },
  button: {
    width: "85%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#293A64",
    marginTop: 20,
  },
  boxView: {
    height: 70,

    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius: 20,
    margin: 5,
  },
  totalPayment: {
    width: "97%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
    marginTop: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
});

export default FormikTextField;
