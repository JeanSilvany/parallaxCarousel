import { View, Dimensions, ScrollView } from "react-native";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

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
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const ImageView = ({ item, index }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const outputRange = [-width * 0.7, 0, width * 0.7];
    const translateXAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: interpolate(scrollX.value, inputRange, outputRange) },
        ],
      };
    });

    return (
      <Animated.Image
        source={{ uri: item }}
        style={[
          translateXAnimatedStyle,
          {
            width: 300 * 1.4,
            height: 500,
            borderRadius: 8,
            padding: 10,
            position: "absolute",
          },
        ]}
        resizeMode="cover"
      />
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          width: width,
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
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
            <ImageView item={item} index={index} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <Animated.FlatList
        onScroll={onScroll}
        horizontal
        data={images}
        renderItem={renderItem}
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          bottom: 120,
          width: "100%",
        }}
      >
        {images.map((_, index) => {
          const DotsWidthAnimatedStyle = useAnimatedStyle(() => {
            const inputRange = images.map((_, i) => i * width);
            const outputRange = inputRange.map((item, i) =>
              i === index ? 20 : 10
            );

            return {
              width: interpolate(scrollX.value, inputRange, outputRange),
            };
          });

          const DotsOpacityAnimatedStyle = useAnimatedStyle(() => {
            const inputRange = images.map((_, i) => i * width);
            const outputRange = inputRange.map((item, i) =>
              i === index ? 1 : 0.5
            );

            return {
              opacity: interpolate(scrollX.value, inputRange, outputRange),
            };
          });

          const DotsScaleAnimatedStyle = useAnimatedStyle(() => {
            const inputRange = images.map((_, i) => i * width);
            const outputRange = inputRange.map((item, i) =>
              i === index ? 1 : 0.8
            );

            return {
              transform: [
                {
                  scale: interpolate(scrollX.value, inputRange, outputRange),
                },
              ],
            };
          });

          return (
            <Animated.View
              key={index}
              style={[
                DotsWidthAnimatedStyle,
                DotsOpacityAnimatedStyle,
                DotsScaleAnimatedStyle,
                {
                  height: 10,
                  backgroundColor: "gray",
                  marginHorizontal: 5,
                  borderRadius: 5,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}
