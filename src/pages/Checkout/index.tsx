import { CreditCard, Barcode } from "lucide-react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function CheckoutCards() {
  const [payWithCard, setPayWithCard] = useState(false);
  const [success, setSuccess] = useState(false); 

  const form = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      cpf: "",
      deliveryEmail: "",
      confirmDeliveryEmail: "",
      cardOwner: "",
      cpfCardOwner: "",
      cardDisplayName: "",
      cardNumber: "",
      expiresMonth: "",
      expiresYear: "",
      cardCode: "",
      installments: "1",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(5, "Name must be at least 5 characters long")
        .required("This field is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("This field is required"),
      cpf: Yup.string()
        .min(14, "O campo precisa ter 14 caracteres")
        .max(15, "O campo precisa ter 14 caracteres")
        .required("O campo é obrigatório"),
      deliveryEmail: Yup.string()
        .email("Invalid email address")
        .required("This field is required"),
      confirmDeliveryEmail: Yup.string()
        .oneOf([Yup.ref("deliveryEmail")], "Emails must match")
        .required("This field is required"),
      cardOwner: Yup.string().when([], { // corrigido para avaliar o estado payWithCard externo
        is: () => payWithCard,
        then: (schema) =>
          schema.min(5, "Name must be at least 5 characters long").required("This field is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      cpfCardOwner: Yup.string().when([], {
        is: () => payWithCard,
        then: (schema) =>
          schema.length(14, "This field must be exactly 14 characters").required("This field is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      cardDisplayName: Yup.string().when([], {
        is: () => payWithCard,
        then: (schema) => schema.required("This field is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      cardNumber: Yup.string().when([], {
        is: () => payWithCard,
        then: (schema) => schema.required("This field is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      expiresMonth: Yup.string().when([], {
        is: () => payWithCard,
        then: (schema) => schema.required("This field is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      expiresYear: Yup.string().when([], {
        is: () => payWithCard,
        then: (schema) => schema.required("This field is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      cardCode: Yup.string().when([], {
        is: () => payWithCard,
        then: (schema) => schema.required("This field is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    onSubmit: (values) => {
      // aqui assumimos que validação passou
      setSuccess(true);
      console.log("Form data:", values);
      // Você pode adicionar chamadas API aqui se quiser
    },
  });

  const getErrorMessage = (fieldName: string) => {
    const isTouched = form.touched[fieldName];
    const errorMsg = form.errors[fieldName];
    return isTouched && errorMsg ? errorMsg : "";
  };

  if (success) {
    // Mensagem após sucesso no submit e validação completa
    return (
      <div className="max-w-[1024px] mx-auto px-4 py-8 text-white bg-zinc-900 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Muito obrigado</h2>
        <p>
          É com satisfação que informamos que recebemos seu pedido com sucesso!
        </p>
        <p className="mt-4 font-semibold">
          Abaixo estão os detalhes da sua compra:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            Número do pedido: <strong>#1004404</strong>
          </li>
          <li>
            Forma de pagamento:{" "}
            <strong>
              {payWithCard ? "Cartão de Crédito" : "Boleto Bancário"}
            </strong>
          </li>
        </ul>
        {!payWithCard && (
          <p>
            Caso tenha optado pelo pagamento via boleto bancário, lembre-se de
            que a confirmação pode levar até 3 dias úteis. Após a aprovação do
            pagamento, enviaremos um e-mail contendo o código de ativação do
            jogo.
          </p>
        )}
        {payWithCard && (
          <p>
            Se você optou pelo pagamento com cartão de crédito, a liberação do
            código de ativação ocorrerá após a aprovação da transação pela
            operadora do cartão. Você receberá o código no e-mail cadastrado em
            nossa loja.
          </p>
        )}
        <p className="mt-4">
          Pedimos que verifique sua caixa de entrada e a pasta de spam para
          garantir que receba nossa comunicação. Caso tenha alguma dúvida ou
          necessite de mais informações, por favor, entre em contato conosco
          através dos nossos canais de atendimento ao cliente.
        </p>
        <p className="mt-6 font-semibold">
          Agradecemos por escolher a Suri e esperamos que gosto de sua compra!
        </p>
      </div>
    );
  }

  // Formulário exibido enquanto não houve sucesso no submit
  return (
    <form
      onSubmit={form.handleSubmit}
      className="max-w-[1024px] mx-auto px-4 py-8 space-y-8 text-white"
    >
      {/* Dados de cobrança */}
      <div className="bg-zinc-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Dados de cobrança</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Nome completo"
              className="w-full px-4 py-3 rounded bg-zinc-800 text-white focus:outline-none"
              {...form.getFieldProps("fullName")}
            />
            <small className="text-red-500">{getErrorMessage("fullName")}</small>
          </div>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              className="w-full px-4 py-3 rounded bg-zinc-800 text-white focus:outline-none"
              {...form.getFieldProps("email")}
            />
            <small className="text-red-500">{getErrorMessage("email")}</small>
          </div>
          <div>
            <input
              id="cpf"
              name="cpf"
              type="text"
              placeholder="CPF"
              className="w-full px-4 py-3 rounded bg-zinc-800 text-white focus:outline-none"
              {...form.getFieldProps("cpf")}
            />
            <small className="text-red-500">{getErrorMessage("cpf")}</small>
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-4">
          Dados de entrega - conteúdo digital
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              id="deliveryEmail"
              name="deliveryEmail"
              type="email"
              placeholder="E-mail"
              className="w-full px-4 py-3 rounded bg-zinc-800 text-white focus:outline-none"
              {...form.getFieldProps("deliveryEmail")}
            />
            <small className="text-red-500">{getErrorMessage("deliveryEmail")}</small>
          </div>
          <div>
            <input
              id="confirmDeliveryEmail"
              name="confirmDeliveryEmail"
              type="email"
              placeholder="Confirme o e-mail"
              className="w-full px-4 py-3 rounded bg-zinc-800 text-white focus:outline-none"
              {...form.getFieldProps("confirmDeliveryEmail")}
            />
            <small className="text-red-500">{getErrorMessage("confirmDeliveryEmail")}</small>
          </div>
        </div>
      </div>

      {/* Pagamento */}
      <div className="bg-zinc-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Pagamento</h2>
        <div className="flex gap-4 mb-4">
          <button
            type="button"
            onClick={() => setPayWithCard(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              !payWithCard ? "bg-zinc-700" : "bg-zinc-800"
            } text-gray-300 hover:bg-zinc-700`}
          >
            <Barcode className="w-5 h-5" />
            Boleto bancário
          </button>
          <button
            type="button"
            onClick={() => setPayWithCard(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              payWithCard ? "bg-zinc-700" : "bg-zinc-800"
            } text-gray-300 hover:bg-zinc-700`}
          >
            <CreditCard className="w-5 h-5" />
            Cartão de crédito
          </button>
        </div>

        {!payWithCard && (
          <p className="text-sm text-gray-300">
            Ao optar por essa forma de pagamento, a confirmação pode levar até 3 dias úteis. A liberação do código de ativação ocorrerá após a aprovação.
          </p>
        )}

        {payWithCard && (
          <div className="bg-zinc-900 rounded-lg p-6 text-black">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <input
                  id="cardOwner"
                  name="cardOwner"
                  type="text"
                  placeholder="Nome do titular do cartão"
                  className="w-full px-4 py-3 rounded bg-white focus:outline-none"
                  {...form.getFieldProps("cardOwner")}
                />
                <small className="text-red-500">{getErrorMessage("cardOwner")}</small>
              </div>
              <div>
                <input
                  id="cpfCardOwner"
                  name="cpfCardOwner"
                  type="text"
                  placeholder="CPF do titular do cartão"
                  className="w-full px-4 py-3 rounded bg-white focus:outline-none"
                  {...form.getFieldProps("cpfCardOwner")}
                />
                <small className="text-red-500">{getErrorMessage("cpfCardOwner")}</small>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <input
                  id="cardDisplayName"
                  name="cardDisplayName"
                  type="text"
                  placeholder="Nome no cartão"
                  className="w-full px-4 py-3 rounded bg-white focus:outline-none"
                  {...form.getFieldProps("cardDisplayName")}
                />
                <small className="text-red-500">{getErrorMessage("cardDisplayName")}</small>
              </div>
              <div>
                <input
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  placeholder="Número do cartão"
                  className="w-full px-4 py-3 rounded bg-white focus:outline-none"
                  {...form.getFieldProps("cardNumber")}
                />
                <small className="text-red-500">{getErrorMessage("cardNumber")}</small>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <input
                  id="expiresMonth"
                  name="expiresMonth"
                  type="text"
                  placeholder="Mês de expiração"
                  maxLength={2}
                  className="w-full px-4 py-3 rounded bg-white focus:outline-none"
                  {...form.getFieldProps("expiresMonth")}
                />
                <small className="text-red-500">{getErrorMessage("expiresMonth")}</small>
              </div>
              <div>
                <input
                  id="expiresYear"
                  name="expiresYear"
                  type="text"
                  placeholder="Ano de expiração"
                  maxLength={4}
                  className="w-full px-4 py-3 rounded bg-white focus:outline-none"
                  {...form.getFieldProps("expiresYear")}
                />
                <small className="text-red-500">{getErrorMessage("expiresYear")}</small>
              </div>
              <div>
                <input
                  id="cardCode"
                  name="cardCode"
                  type="text"
                  placeholder="CVV"
                  maxLength={4}
                  className="w-full px-4 py-3 rounded bg-white focus:outline-none"
                  {...form.getFieldProps("cardCode")}
                />
                <small className="text-red-500">{getErrorMessage("cardCode")}</small>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold text-white">Parcelamento</label>
              <select
                name="installments"
                className="w-40 px-4 py-3 rounded bg-white text-black focus:outline-none"
                {...form.getFieldProps("installments")}
              >
                <option value="1">1x de R$ 169,90</option>
                <option value="2">2x de R$ 85,00</option>
                <option value="3">3x de R$ 56,63</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded"
      >
        Finalizar Compra
      </button>
    </form>
  );
}
