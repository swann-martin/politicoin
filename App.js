import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
  ScrollView,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  FlatList
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from "expo-linear-gradient";
import { fakeApi } from "./fakeApi";
import { AntDesign, EvilIcons } from '@expo/vector-icons/';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const { width, height } = Dimensions.get("window");

  const [coindeskData, setCoindeskData] = useState(fakeApi.coindesk);
  const [BTCPrice, setBTCPrice] = useState(fakeApi.coindesk.bpi.EUR.rate_float);
  const [UpdatedAt, setUpdatedAt] = useState(fakeApi.coindesk.time.updated);
  const [convertData, setConvertData] = useState(fakeApi?.convert);
  const [currencies, setCurrencies] = useState(Object.keys(fakeApi?.convert?.rates));
  const [favoriteCurrencies, setFavoriteCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(
    fakeApi.convert?.rates?.EUR
  );
  const storedFavorite = 'storedFavorite';


  const [amountToConvert, setAmountToConvert] = useState(1);

  const urlCurrentPrice = `https://api.coindesk.com/v1/bpi/currentprice.json`;

  const urlConvert = `https://api.getgeoapi.com/v2/currency/convert?api_key=${process.env.EXPO_PUBLIC_API_KEY}&from=EUR&amount=10&format=json`;

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(storedFavorite, jsonValue);
    } catch (e) {
      // saving error
      console.error(e);
    }
  };


  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(storedFavorite);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      // error reading value
      console.error(e);
    }
  };

  const fetchData = async () => {
    const response = await fetch(urlCurrentPrice);
    const json = await response.json();
    setCoindeskData(json);
    setBTCPrice(json?.bpi?.EUR?.rate_float);
    const res = await fetch(urlConvert);
    const jsonConvert = await res.json();
    !!jsonConvert
      ? setConvertData(jsonConvert)
      : setConvertData(fakeApi.convert);
    if (!!jsonConvert?.rates && !!Object?.keys(jsonConvert?.rates)) setCurrencies(Object?.keys(jsonConvert?.rates));
    return jsonConvert;
  };





  useEffect(() => {
    try {
      fetchData();
      getData().then(data => data ?? setFavoriteCurrencies(data));
    } catch (e) {
      console.log(e);
    }
  }, []);

  // useEffect(() => {
  //   console.log(Object.keys(convertData?.rates));
  // }, [convertData]);

  const logo = require("./assets/politicoin.png");

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);



  const FavItem = ({ selectedCurrency }) => (
    <TouchableOpacity style={{ padding: 10, flexDirection: "row", backgroundColor: "#fff", marginBottom: 10, borderRadius: 5 }} onPress={() => setFavoriteCurrencies(favoriteCurrencies?.filter(item => item?.currency_name !== selectedCurrency?.currency_name))}>
      <Text style={{ flex: 1 }}>{selectedCurrency.currency_name}</Text>
      <Text style={{ flex: 1 }}>{selectedCurrency.rate * BTCPrice}</Text>
      <AntDesign name="delete" size={24} color="white" />
    </TouchableOpacity >
  );

  // Your mission, if you choose to accept it is to build a simple React
  // Native application displaying the current price of BTC (Bitcoin) in as
  // many currencies as possible. We should display the timestamp of when the
  // current price was obtained (available in the API we will be consuming)
  // and it should be possible for the user to update the data that we’re
  // displaying. You’re free to choose what update mechanism to implement.

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#000", "rgba(0,0,0,0.3)"]}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
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
              width: width,
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
              gap: 10
            }}
          >
            {!!coindeskData && (

              <View style={{ width: width - 20, paddingVertical: 20, justifyContent: "center", color: "#fff", fontWeight: "bold" }}>
                <Text style={{ fontWeight: "bold", color: "#fff", marginBottom: 5 }}>Select the amount to convert</Text>

                <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10

                }}
                >
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Amount to convert"
                    textAlign="center"
                    style={{
                      backgroundColor: "#fff",
                      padding: 10,
                      borderRadius: 5,
                      marginVertical: 10,
                      width: "33%"
                    }}
                    value={`${amountToConvert}`}
                    onChangeText={(value) => setAmountToConvert(value)}
                  />
                  <Text>BTC{amountToConvert > 1 ? "s" : ""}</Text>
                </View>

                <Text style={{ fontWeight: "bold", color: "#fff", marginBottom: 5 }}>Select the currency to convert</Text>
                <Picker
                  style={{ backgroundColor: "#333", width: "100%", padding: 10, marginBottom: 10, textAlign: "center", borderRadius: 5, color: "#fff" }}
                  selectedValue={selectedCurrency}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedCurrency(itemValue)
                  }>

                  {convertData?.rates &&
                    Object.keys(convertData?.rates).map((element, id) => (
                      <Picker.Item
                        style={{ backgroundColor: "#333" }}
                        key={id}
                        label={`${element} - (${convertData?.rates?.[element].currency_name})`}
                        value={convertData?.rates?.[element]}
                      />
                    ))}
                </Picker>

                <Text style={{ fontWeight: "bold", color: "#fff", marginBottom: 5 }}>See the price on 1 BTC in the selected currency</Text>

                <TouchableOpacity style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  backgroundColor: "red",
                  borderRadius: 5
                }}
                  onPress={() => {
                    if (favoriteCurrencies.includes(selectedCurrency)) {
                      setFavoriteCurrencies(favoriteCurrencies.filter(item => item !== selectedCurrency));
                    }
                    else {
                      setFavoriteCurrencies([selectedCurrency, ...favoriteCurrencies]);
                    }
                    storeData([selectedCurrency, ...favoriteCurrencies]);
                  }}
                >
                  {!favoriteCurrencies.includes(selectedCurrency) ?
                    <AntDesign name="star" size={24} color="goldenrod" /> :
                    <AntDesign name="staro" size={24} color="goldenrod" />
                  }

                  <Text
                    style={{
                      width: "45%",
                      textAlign: "center",
                      padding: 10,
                      borderRadius: 5,
                      color: "#fff",
                      fontWeight: "bold"
                    }}
                  >

                    <Text>
                      {coindeskData?.bpi?.EUR?.rate
                        .split(".")
                        .join("")
                        .replace(",", ".") *
                        amountToConvert *
                        selectedCurrency.rate}
                    </Text>
                    <Text> {selectedCurrency.currency_name}</Text>
                  </Text>

                </TouchableOpacity>


                {/* ----------------------FAVORITE CURRENCIES---------------------- */}


                {!!favoriteCurrencies &&
                  <View>
                    <Text style={{ color: "#fff", fontWeight: "bold", paddingBottom: 5, paddingTop: 20 }}>Your Favorite Currencies</Text>
                    <FlatList
                      data={favoriteCurrencies}
                      renderItem={({ item }) => <FavItem selectedCurrency={item} />}
                      keyExtractor={item => item.currency_name}
                    />

                  </View>
                }
                {/* ----------------------- UPDATED AT ----------------------- */}
                <View style={{ paddingTop: 20 }}>
                  <Text style={{ color: "#fff" }}>
                    Price Rates updated at :
                    <Text> {new Date(coindeskData?.time?.updatedISO).toLocaleString()}</Text>
                  </Text>

                  <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}><Text style={{ color: "#fff" }}>Slide to update </Text><EvilIcons name="refresh" size={24} color="white" />
                  </View>
                </View>

              </View>
            )}
          </View>

          <Text style={{ color: "#fff", fontWeight: "bold", paddingBottom: 5, paddingTop: 20 }}>All currencies</Text>
          <ScrollView style={{ gap: 10 }}>
            {convertData?.rates &&
              Object.keys(convertData?.rates).map((element, id) => (
                <TouchableOpacity
                  onPress={() =>
                    setSelectedCurrency(convertData?.rates?.[element])
                  }
                  key={id}
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    maxWidth: width - 20,
                    padding: 10,
                    backgroundColor: "#333",
                    borderRadius: 5,
                    color: "#fff",
                    marginVertical: 5
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
        </ScrollView>

        <StatusBar style="auto" />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50
  },
  scrollView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
