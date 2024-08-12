// import library yang dibutuhkan untuk setup auth
// disini menggunakan library next-auth versi 3
// untuk detail penggunaan library nya bisa langsung buka dokumentasi dari next-auth
// disini di setup auth untuk cara provider credential
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { encode } from "next-auth/jwt";

// set default secret value (bisa dilihat di file .env)
const secret = process.env.NEXTAUTH_SECRET;

// handler untuk mengkonfigurasi authentikasi login
// disini menggunakan auth provider credential (login dengan username dan password)
const handler = NextAuth({
  providers: [
    Providers.Credentials({
      name: "Credentials",
      // key credential yang isinya harus sama dgn key di form input field login
      credentials: {
        username: {},
        password: {}
      },
      // kondisi ketika authorize
      // di dalam sini bisa melakukan authorize dengan cara yang lebih kompleks
      // seperti comparing username dan password yang tersimpan di db dgn yg di input di client
      authorize: async (credentials, req) => {
        // setup username == test untuk bisa login ke app
        if(credentials?.username == "test"){
          // return username dan password yang di inputkan
          // nantinya data ini akan masuk ke dalam objek respon yg dikembalikan oleh next-auth
          return {
            username: credentials?.username,
            password: credentials?.password
          }
        }

        // return set default untuk authorize
        return null;
      }
    }),
  ],
  // callback untuk memproses objek serta token yang dihasilkan dari proses login
  callbacks: {
    async jwt(token, user) {
      // ini artinya jika proses login berhasil
      if (user) {
        // diisi token objek user yang isinya username dan password login
        token.user = user
      }

      // kembalikan payload dari token jwt
      return token;
    },
    // session ini bertugas untuk mengatur objek yang dikirim ke client
    // untuk nanti bisa digunakan sebagai kondisi login atau get token
    async session(session, token) {
      // jika sudah berhasil login
      if (token.user) {
        // takeout key expires (krn expired sdh di setup otomatis di konfigurasi session)
        delete session.expires

        session.user = token.user; // edit data session sama dgn data token user

        // generate payload token yang didapat dari proses callback menjadi token jwt
        const jwtString = await encode({
          token, // objek yang di generate menjadi token jwt
          secret, // disini menggunakan value secret yg sudah dijelaskan di atas
        });
        // masukkan hasil generate nya ke key "jwt"
        session.jwt = jwtString;
      }

      // return hasil objek session dan dikirim ke client
      return session;
    }
  },
  // objek jwt gunanya untuk konfigurasi token jwt
  jwt: {
    secret,
    maxAge: 60, // token akan expired selama 60 detik (1 menit)
  },
  // objek session gunanya untuk konfigurasi session
  session: {
    maxAge: 60, // session akan expired selama 60 detik (1 menit)
    strategy: "jwt" // konfigurasi utk token session menggunakan jwt
  }
});

export default handler