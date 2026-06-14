import Badge from "./Badge";

export default function TableRow({ no, name, date, status, price }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
      <td className="py-5">{no}</td>
      <td className="font-semibold">{name}</td>
      <td>{date}</td>
      <td>
        <Badge type="success" text={status} />
      </td>
      <td className="font-bold">{price}</td>
    </tr>
  );
}