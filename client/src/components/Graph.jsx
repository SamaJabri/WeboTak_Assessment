import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  ResponsiveContainer,
} from "recharts";

const Graph = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ left: -40, top: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="answer" />
        <YAxis allowDecimals={false} />
        <Bar dataKey="numofanswers" fill="#6A48A1" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Graph;
