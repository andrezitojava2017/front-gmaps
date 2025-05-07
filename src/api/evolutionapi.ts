/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

const APIKEY = process.env.NEXT_PUBLIC_API_KEY;
const INSTANCE = process.env.NEXT_PUBLIC_INSTANCE;
const HOST = process.env.NEXT_PUBLIC_URL_HOST;

export const checkIsWahtsapp = async (phone: string) => {
  try {
    const url = `${HOST}/chat/whatsappNumbers/${INSTANCE}`;
    const opt = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: `${APIKEY}`, // Inclui a API Key no cabeçalho
      },
      body: JSON.stringify({ numbers: [phone] }),
    };

    const response = await fetch(url, opt);

    if (!response.ok) {
      throw new Error("Erro ao tentar verificar numero do whatsapp");
    }

    return response;

  } catch (error) {
    throw new Error("Erro ao verificar numero de whatsapp");
  }
};
