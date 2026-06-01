export default function Table({
  headers,
  children,
}) {
  return (
    <table className="w-full text-sm mt-6">

      <thead>
        <tr className="text-left text-gray-400 border-b border-gray-100">

          {headers.map((header) => (
            <th
              key={header}
              className="pb-4 font-medium"
            >
              {header}
            </th>
          ))}

        </tr>
      </thead>

      <tbody className="text-black">
        {children}
      </tbody>

    </table>
  );
}