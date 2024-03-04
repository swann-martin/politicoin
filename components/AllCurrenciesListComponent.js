import {
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  View
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
export default AllCurrenciesListComponent = ({
  convertData,
  amountToConvert,
  BTCPrice,
  setSelectedCurrency,
  isModalVisible,
  setIsModalVisible
}) => {
  const { width } = Dimensions.get("window");
  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
          alignItems: "center",
          padding: 10,
          width: width
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold"
          }}
        >
          All
          {convertData?.rates
            ? " " + Object.keys(convertData?.rates).length
            : ""}{" "}
          currencies
        </Text>

        <TouchableOpacity
          style={{
            color: "#fff",
            fontWeight: "bold"
          }}
          onPress={() => setIsModalVisible(false)}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ gap: 10 }}>
        {convertData?.rates &&
          Object.keys(convertData?.rates).map((element, id) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedCurrency(convertData?.rates?.[element]);
                setIsModalVisible(false);
              }}
              key={element + "-currency-" + id}
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
    </Modal>
  );
};
