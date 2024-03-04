import { Text } from "react-native";
import { Picker } from '@react-native-picker/picker';


export default SelectCurrencyComponent = ({ selectedCurrency, setSelectedCurrency, rates }) => {
    return (
        <>
            <Text style={{ fontWeight: "bold", color: "#fff", marginBottom: 5 }}>Select the currency to convert</Text>
            <Picker
                style={{ backgroundColor: "#333", width: "100%", padding: 10, marginBottom: 10, textAlign: "center", borderRadius: 5, color: "#fff" }}
                selectedValue={selectedCurrency}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedCurrency(itemValue)
                }>

                {rates &&
                    Object.keys(rates).map((element, id) => (
                        <Picker.Item
                            style={{ backgroundColor: "#333" }}
                            key={id}
                            label={`${element} - (${rates?.[element].currency_name})`}
                            value={rates?.[element]}
                        />
                    ))}
            </Picker>
        </>

    )
}