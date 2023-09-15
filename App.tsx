import { useRef } from "react";
import { View, Dimensions, Animated } from "react-native";

const { width } = Dimensions.get("screen");

const images = [
  "https://fastly.picsum.photos/id/674/1920/1080.jpg?hmac=-Di2Z5ARQrYUoegBDpVrMOaU5eT5_bvjllHiea1lqEs",
  "https://fastly.picsum.photos/id/317/1920/1080.jpg?hmac=z3HXgAu6r23_BnKKT6e6CUiUD8hLuYvnlAYrqiZgYQw",
  "https://fastly.picsum.photos/id/840/1920/1080.jpg?hmac=GUemBcJcyE9NXOZhQkVmU7ANchHs17B1NfA5IxCLi1A",
  "https://fastly.picsum.photos/id/129/1920/1080.jpg?hmac=El-gJUptoDKqIqalfTFwc3EvIp0rKnPspMt18sZzvTk",
  "https://fastly.picsum.photos/id/386/1920/1080.jpg?hmac=GaG2mvIf6h1LedZTQjqz6FMrFD0DMNCBWyNJkuHDXpU",
  "https://fastly.picsum.photos/id/1056/1920/1080.jpg?hmac=QYMVMuFjmtGsWKQU_ICfJkVQXngKzlZYH0YO7BbgYGY",
  "https://fastly.picsum.photos/id/413/1920/1080.jpg?hmac=DTdv_AxnEpp5KQFgpzmi1Ayxj6VLuwonto7bsjVDx9U",
  "https://fastly.picsum.photos/id/230/1920/1080.jpg?hmac=dp5Bgr7HY2DVSaMJELl-mOby4a01jWYDqeBMuzgzQA8",
];

export default function App() {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [-width * 0.7, 0, width * 0.7],
    });

    return (
      <View
        style={{
          width: width,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            elevation: 2,
            shadowColor: "black",
            shadowOpacity: 1,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 0 },
            padding: 12,
            backgroundColor: "white",
            borderRadius: 18,
          }}
        >
          <View
            style={{
              overflow: "hidden",
              width: 300,
              height: 500,
              alignItems: "center",
              borderRadius: 14,
            }}
          >
            <Animated.Image
              source={{ uri: item }}
              style={[
                {
                  width: 300 * 1.4,
                  height: 500,
                  borderRadius: 8,
                  padding: 10,
                  position: "absolute",
                  transform: [{ translateX }],
                },
              ]}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        horizontal
        data={images}
        renderItem={renderItem}
        pagingEnabled
      />
    </View>
  );
}