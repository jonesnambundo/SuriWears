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
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Invalid CPF (format: 000.000.000-00)")
        .required("CPF is required"),
      deliveryEmail: Yup.string()
        .email("Invalid email address")
        .required("This field is required"),
      confirmDeliveryEmail: Yup.string()
        .oneOf([Yup.ref("deliveryEmail")], "Emails must match")
        .required("This field is required"),
      cardOwner: Yup.string().when([], {
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
      setSuccess(true);
      console.log("Form data:", values);
    },
  });

  const getErrorMessage = (fieldName: string) => {
    const isTouched = form.touched[fieldName];
    const errorMsg = form.errors[fieldName];
    return isTouched && errorMsg ? errorMsg : "";
  };

  if (success) {
    return (
      <div className="max-w-[1024px] mx-auto px-12 py-8 text-white bg-zinc-900 rounded-lg mt-16">
        <h2 className="text-2xl font-bold mb-4">Thank you very much</h2>
        <p>
          We are pleased to inform you that we have successfully received your order!
        </p>
        <p className="mt-4 font-semibold">
          Below are the details of your purchase:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            Order number: <strong>#1004404</strong>
          </li>
          <li>
            Payment method:{" "}
            <strong>
              {payWithCard ? "Credit Card" : "Bank Slip"}
            </strong>
          </li>
        </ul>
        {!payWithCard && (
          <p>
            If you chose to pay by bank slip, please note that confirmation may take up to 3 business days. After payment approval, we will send you an email containing the activation code for the game.
          </p>
        )}
        {payWithCard && (
          <p>
            If you chose to pay by credit card, the activation code will be released after the transaction is approved by the card operator. You will receive the code at the email registered in our store.
          </p>
        )}
        <p className="mt-4">
          Please check your inbox and spam folder to ensure you receive our communication. If you have any questions or need more information, please contact us through our customer service channels.
        </p>
        <p className="mt-6 font-semibold">
          Thank you for choosing Suri. We hope you enjoy your purchase!
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit}
      className="max-w-[1024px] mx-auto px-4 py-8 space-y-8 text-white"
    >
      {/* Billing Information */}
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-6 text-black">
          Billing Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded bg-zinc-200 text-black focus:outline-none"
              {...form.getFieldProps("fullName")}
            />
            <small className="text-red-500">
              {getErrorMessage("fullName")}
            </small>
          </div>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded bg-zinc-200 text-black focus:outline-none"
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
              className="w-full px-4 py-3 rounded bg-zinc-200 text-black focus:outline-none"
              {...form.getFieldProps("cpf")}
            />
            <small className="text-red-500">{getErrorMessage("cpf")}</small>
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-4 text-black">
          Delivery Information - Digital Content
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              id="deliveryEmail"
              name="deliveryEmail"
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded bg-zinc-200 text-black focus:outline-none"
              {...form.getFieldProps("deliveryEmail")}
            />
            <small className="text-red-500">
              {getErrorMessage("deliveryEmail")}
            </small>
          </div>
          <div>
            <input
              id="confirmDeliveryEmail"
              name="confirmDeliveryEmail"
              type="email"
              placeholder="Confirm Email"
              className="w-full px-4 py-3 rounded bg-zinc-200 text-black focus:outline-none"
              {...form.getFieldProps("confirmDeliveryEmail")}
            />
            <small className="text-red-500">
              {getErrorMessage("confirmDeliveryEmail")}
            </small>
          </div>
        </div>
      </div>

      {/* Payment */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6 text-black">Payment</h2>
        <div className="flex gap-4 mb-4">
          <button
            type="button"
            onClick={() => setPayWithCard(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              !payWithCard ? "bg-zinc-700" : "bg-zinc-800"
            } text-gray-300 hover:bg-zinc-700`}
          >
            <Barcode className="w-5 h-5" />
            Bank Slip
          </button>
          <button
            type="button"
            onClick={() => setPayWithCard(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              payWithCard ? "bg-zinc-700" : "bg-zinc-800"
            } text-gray-300 hover:bg-zinc-700`}
          >
            <CreditCard className="w-5 h-5" />
            Credit Card
          </button>
        </div>

        {!payWithCard && (
          <p className="text-sm text-black">
            By choosing this payment method, confirmation may take up to 3
            business days. Activation code will be released after approval.
          </p>
        )}

        {payWithCard && (
          <div className="bg-white shadow-lg rounded-lg p-6 text-black">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <input
                  id="cardOwner"
                  name="cardOwner"
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full px-4 py-3 rounded bg-zinc-200 focus:outline-none"
                  {...form.getFieldProps("cardOwner")}
                />
                <small className="text-red-500">
                  {getErrorMessage("cardOwner")}
                </small>
              </div>
              <div>
                <input
                  id="cpfCardOwner"
                  name="cpfCardOwner"
                  type="text"
                  placeholder="Cardholder CPF"
                  className="w-full px-4 py-3 rounded bg-zinc-200 focus:outline-none"
                  {...form.getFieldProps("cpfCardOwner")}
                />
                <small className="text-red-500">
                  {getErrorMessage("cpfCardOwner")}
                </small>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <input
                  id="cardDisplayName"
                  name="cardDisplayName"
                  type="text"
                  placeholder="Name on Card"
                  className="w-full px-4 py-3 rounded bg-zinc-200 focus:outline-none"
                  {...form.getFieldProps("cardDisplayName")}
                />
                <small className="text-red-500">
                  {getErrorMessage("cardDisplayName")}
                </small>
              </div>
              <div>
                <input
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  placeholder="Card Number"
                  className="w-full px-4 py-3 rounded bg-zinc-200 focus:outline-none"
                  {...form.getFieldProps("cardNumber")}
                />
                <small className="text-red-500">
                  {getErrorMessage("cardNumber")}
                </small>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <input
                  id="expiresMonth"
                  name="expiresMonth"
                  type="text"
                  placeholder="Expiration Month"
                  maxLength={2}
                  className="w-full px-4 py-3 rounded bg-zinc-200 focus:outline-none"
                  {...form.getFieldProps("expiresMonth")}
                />
                <small className="text-red-500">
                  {getErrorMessage("expiresMonth")}
                </small>
              </div>
              <div>
                <input
                  id="expiresYear"
                  name="expiresYear"
                  type="text"
                  placeholder="Expiration Year"
                  maxLength={4}
                  className="w-full px-4 py-3 rounded bg-zinc-200 focus:outline-none"
                  {...form.getFieldProps("expiresYear")}
                />
                <small className="text-red-500">
                  {getErrorMessage("expiresYear")}
                </small>
              </div>
              <div>
                <input
                  id="cardCode"
                  name="cardCode"
                  type="text"
                  placeholder="CVV"
                  maxLength={4}
                  className="w-full px-4 py-3 rounded bg-zinc-200 focus:outline-none"
                  {...form.getFieldProps("cardCode")}
                />
                <small className="text-red-500">
                  {getErrorMessage("cardCode")}
                </small>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold text-black">
                Installments
              </label>
              <select
                name="installments"
                className="w-40 px-4 py-3 rounded bg-zinc-200 text-black focus:outline-none"
                {...form.getFieldProps("installments")}
              >
                <option value="1">1x of $169.90</option>
                <option value="2">2x of $85.00</option>
                <option value="3">3x of $56.63</option>
              </select>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full my-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded"
        >
          Complete Purchase
        </button>
      </div>
    </form>
  );
}
