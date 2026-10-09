/** Clinic WhatsApp link. Used by FormWhatsapp. */
export const WHATSAPP_URL = "https://wa.me/5547997660991";

/** Booking options: select value, visible label, and the phrase the message quotes. */
export const SERVICOS = [
  {
    value: "avaliacao-geral",
    label: "Ainda não sei, quero uma avaliação geral",
    trecho: "",
  },
  {
    value: "implante",
    label: "Implante dentário",
    trecho: "implante dentário",
  },
  { value: "protese", label: "Prótese dentária", trecho: "prótese dentária" },
  {
    value: "ortodontia",
    label: "Ortodontia (aparelho ou alinhadores)",
    trecho: "ortodontia (aparelho ou alinhadores)",
  },
  {
    value: "clinico-geral",
    label: "Clínico geral (limpeza, restauração, cárie)",
    trecho: "clínico geral (limpeza, restauração ou cárie)",
  },
  {
    value: "canal",
    label: "Tratamento de canal",
    trecho: "tratamento de canal",
  },
  {
    value: "gengiva",
    label: "Gengiva (periodontia)",
    trecho: "tratamento de gengiva",
  },
];

/** Builds the WhatsApp message for a name and a service value. */
export function whatsappText(nome: string, servico: string): string {
  const name = nome.trim().replace(/\s+/g, " ");
  const trecho = SERVICOS.find((option) => option.value === servico)?.trecho;
  const intro = `Olá! Meu nome é ${name}. Vim pelo site e gostaria de agendar uma avaliação`;
  return trecho ? `${intro} para ${trecho}.` : `${intro}.`;
}
