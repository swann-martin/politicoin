import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native";
import { fakeApi } from "./fakeApi";

export default function App() {
  const { width, height } = Dimensions.get("window");

  const [coindeskData, setCoindeskData] = useState(fakeApi.coindesk);
  const [BTCPrice, setBTCPrice] = useState(fakeApi.coindesk.bpi.EUR.rate_float);
  const [UpdatedAt, setUpdatedAt] = useState(fakeApi.coindesk.time.updated);
  const [convertData, setConvertData] = useState(fakeApi.convert);
  const currencies = Object.keys(convertData?.rates);
  const [selectedCurrency, setSelectedCurrency] = useState(
    fakeApi.convert?.rates?.EUR
  );
  const [amountToConvert, setAmountToConvert] = useState(1);

  const fetchData = async () => {
    const response = await fetch(urlCurrentPrice);
    const json = await response.json();
    setData(json);
    return data;
  };

  // useEffect(() => {
  //   try {
  //     setData(fetchData());
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log(Object.keys(convertData?.rates));
  // }, [convertData]);

  const logo = require("./assets/politicoin.png");
  return (
    <View style={styles.container}>
      {/* <Button title="Get data" onPress={fetchData}>
        Get data
      </Button> */}

      <View
        style={{
          width: width,
          paddingTop: 50,
          height: 100,
          marginBottom: 40,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Image source={logo} style={{ width: 150, height: 150 }} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          gap: 10
        }}
      >
        {!!coindeskData && (
          <View style={{ color: "#fff", fontWeight: "bold" }}>
            <Text>
              Updated :
              {new Date(coindeskData?.time?.updatedISO).toLocaleString()}
            </Text>

            {/* <TextInput
              placeholder="Currency to convert"
              value={currencyToConvert}
              onChangeText={(value) => setCurrencyToConvert(value)}
            /> */}
            <TextInput
              keyboardType="numeric"
              placeholder="Amount to convert"
              value={amountToConvert}
              onChangeText={(value) => setAmountToConvert(value)}
            />
            <Text
              style={{
                backgroundColor: "red",
                padding: 10,
                borderRadius: 5,
                color: "#fff",
                fontWeight: "bold"
              }}
            >
              <Text>{amountToConvert} BTC = </Text>

              <Text>
                {coindeskData?.bpi?.EUR?.rate
                  .split(".")
                  .join("")
                  .replace(",", ".") *
                  amountToConvert *
                  selectedCurrency.rate}
                {selectedCurrency?.currency_name}
              </Text>
            </Text>
          </View>
        )}
      </View>

      <Text>Amount to convert : {amountToConvert} BTC</Text>

      <ScrollView style={{ gap: 10 }}>
        {convertData?.rates &&
          Object.keys(convertData?.rates).map((element, id) => (
            <TouchableOpacity
              onPress={() => setSelectedCurrency(convertData?.rates?.[element])}
              key={id}
              style={{
                flexDirection: "row",
                gap: 10,
                padding: 10,
                backgroundColor: "#333",
                borderRadius: 5,
                color: "#fff",
                margin: 5
              }}
            >
              <Text style={{ color: "#fff" }}>{element}</Text>

              <Text style={{ color: "#fff" }}>
                {convertData?.rates?.[element]?.rate *
                  BTCPrice *
                  amountToConvert}
              </Text>
              <Text style={{ color: "#fff" }}>
                {convertData?.rates?.[element]?.currency_name}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>

      {/* <Text style={{ color: "#fff" }}>
        Your mission, if you choose to accept it is to build a simple React
        Native application displaying the current price of BTC (Bitcoin) in as
        many currencies as possible. We should display the timestamp of when the
        current price was obtained (available in the API we will be consuming)
        and it should be possible for the user to update the data that we’re
        displaying. You’re free to choose what update mechanism to implement.
      </Text> */}

      <Text></Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#fff",
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50
  }
});
