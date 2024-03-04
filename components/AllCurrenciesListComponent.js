import { Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";


export default AllCurrenciesListComponent = ({ convertData, amountToConvert, BTCPrice, setSelectedCurrency }) => {
    const { width } = Dimensions.get("window");
    return (
        <>
            <Text style={{ color: "#fff", fontWeight: "bold", paddingBottom: 5, paddingTop: 20 }}>All currencies</Text>
            <ScrollView style={{ gap: 10 }}>
                {convertData?.rates &&
                    Object.keys(convertData?.rates).map((element, id) => (
                        <TouchableOpacity
                            onPress={() =>
                                setSelectedCurrency(convertData?.rates?.[element])
                            }
                            key={element + id}
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
        </>
    )
}