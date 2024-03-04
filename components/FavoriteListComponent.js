import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons/";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storedFavorite = "storedFavorite";

export default FavoriteListComponent = ({
  favoriteCurrencies,
  selectedCurrency,
  storeData,
  BTCPrice,
  setFavoriteCurrencies
}) => {
  const FavItem = ({ selectedCurrency, setFavoriteCurrencies }) => (
    <TouchableOpacity
      style={{
        padding: 10,
        flexDirection: "row",
        backgroundColor: "#fff",
        marginBottom: 10,
        borderRadius: 5
      }}
      onPress={() => {
        const newList = favoriteCurrencies?.filter(
          (item) => item?.currency_name !== selectedCurrency?.currency_name
        );
        setFavoriteCurrencies([...newList]);
        storeData(newList);
      }}
    >
      <Text style={{ flex: 1 }}>{selectedCurrency.currency_name}</Text>
      <Text style={{ flex: 1 }}>{selectedCurrency.rate * BTCPrice}</Text>
      <AntDesign name="delete" size={24} color="white" />
    </TouchableOpacity>
  );

  return (
    <View>
      <Text
        style={{
          color: "#fff",
          fontWeight: "bold",
          paddingBottom: 5,
          paddingTop: 20
        }}
      >
        Your Favorite Currencies
      </Text>
      <FlatList
        data={favoriteCurrencies}
        renderItem={({ item }) => (
          <FavItem
            selectedCurrency={item}
            setFavoriteCurrencies={setFavoriteCurrencies}
          />
        )}
        keyExtractor={(item, index) => {
          item.currency_name + "-Fav-" + index;
        }}
      />
    </View>
  );
};
