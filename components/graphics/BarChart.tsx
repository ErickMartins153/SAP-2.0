import { Bar, CartesianChart } from "victory-native";
import { LinearGradient, vec } from "@shopify/react-native-skia";
import { View } from "react-native";

const data = Array.from({ length: 6 }, (_, index) => ({
  month: index + 1,
  listenCount: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
}));

export default function BarChart() {
  return (
    <View
      style={{
        width: "80%",
        aspectRatio: 9 / 8,
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <CartesianChart
        data={data}
        xKey="month"
        yKeys={["listenCount"]}
        domainPadding={30}
        axisOptions={{
          formatXLabel(value) {
            const date = new Date(2023, value - 1);

            return date.toLocaleString("default", { month: "short" });
          },
        }}
      >
        {({ points, chartBounds }) => (
          <Bar
            chartBounds={chartBounds}
            points={points.listenCount}
            roundedCorners={{
              topLeft: 5,
              topRight: 5,
            }}
          >
            <LinearGradient
              start={vec(0, 0)}
              end={vec(0, 400)}
              colors={["#a78bfa", "#a78bfa50"]}
            />
          </Bar>
        )}
      </CartesianChart>
    </View>
  );
}
