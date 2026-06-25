import Badge from "../components/common/Badge";
import MemberInfoCard from "../components/member/MemberInfoCard";
import Table from "../components/common/Table";

export default function Member() {
  const interactions = [
    ["01", "Komplain", "Keluhan suara mesin kasar", "Resolved"],
    ["02", "Feedback", "Pelayanan cepat dan ramah", "Completed"],
    ["03", "Tiket Bantuan", "Pertanyaan estimasi biaya service", "Pending"],
  ];

  const transactions = [
    ["01", "Engine Repair", "QRIS", "Rp 750.000", "12 Juni 2026"],
    ["02", "Oil Change", "Cash", "Rp 180.000", "20 Mei 2026"],
    ["03", "Brake Service", "Transfer", "Rp 350.000", "10 April 2026"],
  ];

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[32px] font-bold leading-[125%] text-black">
          Member Detail
        </h1>

        <p className="text-[14px] leading-[160%] text-gray-500 mt-2">
          Informasi lengkap member/customer GaragePro.
        </p>
      </div>

      <section className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-5">
        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="member"
          className="w-20 h-20 rounded-full object-cover"
        />

        <div>
          <h2 className="text-[24px] font-bold text-black">
            {currentUser?.fullname || "Guest"}
          </h2>

          <p className="text-[14px] text-gray-500">
            @{currentUser?.username || "guest"} •{" "}
            {currentUser?.id || "CUST-000"}
          </p>

          <div className="mt-3">
            <Badge type="success" text="Active Member" />
          </div>
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        <MemberInfoCard title="Data Identitas Customer">
          <p>
            <span className="font-semibold">Nama Lengkap:</span>{" "}
            {currentUser?.fullname}
          </p>
          <p>
            <span className="font-semibold">Username:</span> @
            {currentUser?.username}
          </p>
          <p>
            <span className="font-semibold">ID Customer:</span>{" "}
            {currentUser?.id}
          </p>
          <p>
            <span className="font-semibold">Jenis Kelamin:</span>{" "}
            {currentUser?.gender}
          </p>
          <p>
            <span className="font-semibold">Tanggal Lahir:</span>{" "}
            {currentUser?.birthDate}
          </p>
        </MemberInfoCard>

        <MemberInfoCard title="Kontak">
          <p>
            <span className="font-semibold">Nomor HP:</span> 0812-3456-7890
          </p>
          <p>
            <span className="font-semibold">Email:</span> budi@email.com
          </p>
          <p>
            <span className="font-semibold">Alamat:</span> Jl. Sudirman No. 20
          </p>
          <p>
            <span className="font-semibold">Kota/Provinsi:</span> Pekanbaru,
            Riau
          </p>
          <p>
            <span className="font-semibold">Media Sosial:</span> Instagram
            @budi_garage
          </p>
        </MemberInfoCard>

        <MemberInfoCard title="Data Akun / Membership">
          <p>
            <span className="font-semibold">Tanggal Daftar:</span> 10 Januari
            2026
          </p>
          <p>
            <span className="font-semibold">Status Member:</span> Member
          </p>
          <p>
            <span className="font-semibold">Level Membership:</span> Gold
          </p>
          <p>
            <span className="font-semibold">Referral Code:</span> BUDI10
          </p>
          <p>
            <span className="font-semibold">Status Aktif:</span> Aktif
          </p>
        </MemberInfoCard>

        <MemberInfoCard title="Ringkasan Transaksi">
          <p>
            <span className="font-semibold">Total Transaksi:</span> Rp 1.280.000
          </p>
          <p>
            <span className="font-semibold">Total Service:</span> 3 kali
          </p>
          <p>
            <span className="font-semibold">Metode Pembayaran Favorit:</span>{" "}
            QRIS
          </p>
          <p>
            <span className="font-semibold">Service Terakhir:</span> Engine
            Repair
          </p>
          <p>
            <span className="font-semibold">Tanggal Terakhir:</span> 12 Juni
            2026
          </p>
        </MemberInfoCard>
      </div>

      <section className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-[20px] font-bold text-black">Riwayat Interaksi</h2>

        <Table headers={["No", "Jenis", "Catatan", "Status"]}>
          {interactions.map((item) => (
            <tr
              key={item[0]}
              className="border-b border-gray-100 hover:bg-gray-50 transition"
            >
              <td className="py-5">{item[0]}</td>
              <td className="font-semibold">{item[1]}</td>
              <td>{item[2]}</td>
              <td>
                <Badge
                  type={
                    item[3] === "Resolved" || item[3] === "Completed"
                      ? "success"
                      : "pending"
                  }
                  text={item[3]}
                />
              </td>
            </tr>
          ))}
        </Table>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-[20px] font-bold text-black">Data Transaksi</h2>

        <Table headers={["No", "Service", "Payment", "Total", "Tanggal"]}>
          {transactions.map((item) => (
            <tr
              key={item[0]}
              className="border-b border-gray-100 hover:bg-gray-50 transition"
            >
              <td className="py-5">{item[0]}</td>
              <td className="font-semibold">{item[1]}</td>
              <td>{item[2]}</td>
              <td className="font-bold">{item[3]}</td>
              <td>{item[4]}</td>
            </tr>
          ))}
        </Table>
      </section>
    </div>
  );
}
