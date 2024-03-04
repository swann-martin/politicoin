import { Text, View } from "react-native";
import { EvilIcons } from '@expo/vector-icons/';

export default UpdatedAtComponent = ({ coindeskData }) => (
    <View style={{ paddingTop: 20 }}>
        <Text style={{ color: "#fff" }}>
            Price Rates updated at :
            <Text> {new Date(coindeskData?.time?.updatedISO).toLocaleString()}</Text>
        </Text>

        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}><Text style={{ color: "#fff" }}>Slide to update </Text><EvilIcons name="refresh" size={24} color="white" />
        </View>
    </View>
)