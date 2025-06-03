import { CreditCard, Barcode } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

export default function CheckoutCards() {
  const [payWithCard, setPayWithCard] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const schema = z
    .object({
      fullName: z.string().min(5, "Name must be at least 5 characters long"),
      email: z.string().email("Invalid email address"),
      cpf: z.string().regex(cpfRegex, "Invalid CPF (format: 000.000.000-00)"),
      deliveryEmail: z.string().email("Invalid email address"),
      confirmDeliveryEmail: z.string(),
      cardOwner: z.string().optional(),
      cpfCardOwner: z.string().optional(),
      cardDisplayName: z.string().optional(),
      cardNumber: z.string().optional(),
      expiresMonth: z.string().optional(),
      expiresYear: z.string().optional(),
      cardCode: z.string().optional(),
      installments: z.string().optional(),
    })
    .refine((data) => data.deliveryEmail === data.confirmDeliveryEmail, {
      path: ["confirmDeliveryEmail"],
      message: "Emails must match",
    })
    .refine(
      (data) => {
        if (payWithCard) {
          return (
            data.cardOwner &&
            data.cardOwner.length >= 5 &&
            data.cpfCardOwner &&
            cpfRegex.test(data.cpfCardOwner) &&
            data.cardDisplayName &&
            data.cardNumber &&
            data.expiresMonth &&
            data.expiresYear &&
            data.cardCode
          );
        }
        return true;
      },
      {
        path: ["cardOwner"],
        message: "Please fill all card details correctly",
      }
    );

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
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
  });

  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    console.log("Form data:", data);

    setTimeout(() => {
      setSuccess(true);
      setIsLoading(false);
      reset();
    }, 2000);
  };

  useEffect(() => {
    if (success) {
      dispatch(clearCart());
    }
  }, [success, dispatch]);

  if (success) {
    return (
    <div className="max-w-[1280px] mx-4 sm:mx-auto px-4 sm:px-12 py-8 bg-white border border-gray-300 rounded-lg shadow-sm text-black m-12">
        <h2 className="text-2xl font-bold mb-4">Thank you very much</h2>
        <p>
          We are pleased to inform you that we have successfully received your
          order!
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
            <strong>{payWithCard ? "Credit Card" : "Bank Slip"}</strong>
          </li>
        </ul>
        {!payWithCard && (
          <p>
            If you chose to pay by bank slip, please note that confirmation may
            take up to 3 business days. After payment approval, we will send you
            an email containing the activation code for the game.
          </p>
        )}
        {payWithCard && (
          <p>
            If you chose to pay by credit card, the activation code will be
            released after the transaction is approved by the card operator. You
            will receive the code at the email registered in our store.
          </p>
        )}
        <p className="mt-4">
          Please check your inbox and spam folder to ensure you receive our
          communication. If you have any questions or need more information,
          please contact us through our customer service channels.
        </p>
        <p className="mt-6 font-semibold">
          Thank you for choosing Suri. We hope you enjoy your purchase!
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[1280px] mx-auto px-4 py-8 space-y-8 text-white"
      noValidate
    >
      {/* Billing Information */}
      <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6 text-black">
          Billing Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <input
              id="fullName"
              placeholder="Full Name"
              className={`w-full px-4 py-3 rounded bg-zinc-200 text-black focus:outline-none ${
                errors.fullName ? "border border-red-500" : ""
              }`}
              {...register("fullName")}
            />
            <small className="text-red-500">{errors.fullName?.message}</small>
          </div>

          <div>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className={`w-full px-4 py-3 rounded bg-zinc-200 text-black focus:outline-none ${
                errors.email ? "border border-red-500" : ""
              }`}
              {...register("email")}
            />
            <small className="text-red-500">{errors.email?.message}</small>
          </div>

          <div>
            <input
              id="cpf"
              placeholder="CPF (000.000.000-00)"
              className={`w-full px-4 py-3 rounded bg-zinc-200 text-black focus:outline-none ${
                errors.cpf ? "border border-red-500" : ""
              }`}
              {...register("cpf")}
            />
            <small className="text-red-500">{errors.cpf?.message}</small>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-4 text-black">
          Delivery Information - Digital Content
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              id="deliveryEmail"
              type="email"
              placeholder="Email"
              className={`w-full px-4 py-3 rounded bg-zinc-200 text-black focus:outline-none ${
                errors.deliveryEmail ? "border border-red-500" : ""
              }`}
              {...register("deliveryEmail")}
            />
            <small className="text-red-500">
              {errors.deliveryEmail?.message}
            </small>
          </div>
          <div>
            <input
              id="confirmDeliveryEmail"
              type="email"
              placeholder="Confirm Email"
              className={`w-full px-4 py-3 rounded bg-zinc-200 text-black focus:outline-none ${
                errors.confirmDeliveryEmail ? "border border-red-500" : ""
              }`}
              {...register("confirmDeliveryEmail")}
            />
            <small className="text-red-500">
              {errors.confirmDeliveryEmail?.message}
            </small>
          </div>
        </div>
      </div>

      {/* Payment */}
      <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6 text-black">Payment</h2>
        <div className="flex gap-4 mb-4">
          <button
            type="button"
            onClick={() => setPayWithCard(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              !payWithCard ? "bg-green-600" : "bg-zinc-600"
            } text-gray-300`}
          >
            <Barcode className="w-5 h-5" />
            Bank Slip
          </button>
          <button
            type="button"
            onClick={() => setPayWithCard(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              payWithCard ? "bg-green-600" : "bg-zinc-600"
            } text-gray-300`}
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
          <div className="bg-zinc-100 rounded-md p-6 shadow-sm text-black">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <input
                  id="cardOwner"
                  placeholder="Cardholder Name"
                  className={`w-full px-4 py-3 rounded bg-zinc-200 focus:outline-none ${
                    errors.cardOwner ? "border border-red-500" : ""
                  }`}
                  {...register("cardOwner")}
                />
                <small className="text-red-500">
                  {errors.cardOwner?.message}
                </small>
              </div>

              <div>
                <input
                  id="cpfCardOwner"
                  placeholder="Cardholder CPF (000.000.000-00)"
                  className={`w-full px-4 py-3 rounded bg-zinc-200 focus:outline-none ${
                    errors.cpfCardOwner ? "border border-red-500" : ""
                  }`}
                  {...register("cpfCardOwner")}
                />
                <small className="text-red-500">
                  {errors.cpfCardOwner?.message}
                </small>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <input
                  id="cardDisplayName"
                  placeholder="Name on Card"
                  className={`w-full px-4 py-3 rounded bg-zinc-200 focus:outline-none ${
                    errors.cardDisplayName ? "border border-red-500" : ""
                  }`}
                  {...register("cardDisplayName")}
                />
                <small className="text-red-500">
                  {errors.cardDisplayName?.message}
                </small>
              </div>

              <div>
                <input
                  id="cardNumber"
                  placeholder="Card Number"
                  className={`w-full px-4 py-3 rounded bg-zinc-200 focus:outline-none ${
                    errors.cardNumber ? "border border-red-500" : ""
                  }`}
                  {...register("cardNumber")}
                />
                <small className="text-red-500">
                  {errors.cardNumber?.message}
                </small>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <input
                  id="expiresMonth"
                  placeholder="Expiration Month"
                  maxLength={2}
                  className={`w-full px-4 py-3 rounded bg-zinc-200 focus:outline-none ${
                    errors.expiresMonth ? "border border-red-500" : ""
                  }`}
                  {...register("expiresMonth")}
                />
                <small className="text-red-500">
                  {errors.expiresMonth?.message}
                </small>
              </div>

              <div>
                <input
                  id="expiresYear"
                  placeholder="Expiration Year"
                  maxLength={4}
                  className={`w-full px-4 py-3 rounded bg-zinc-200 focus:outline-none ${
                    errors.expiresYear ? "border border-red-500" : ""
                  }`}
                  {...register("expiresYear")}
                />
                <small className="text-red-500">
                  {errors.expiresYear?.message}
                </small>
              </div>

              <div>
                <input
                  id="cardCode"
                  placeholder="CVV"
                  maxLength={4}
                  className={`w-full px-4 py-3 rounded bg-zinc-200 focus:outline-none ${
                    errors.cardCode ? "border border-red-500" : ""
                  }`}
                  {...register("cardCode")}
                />
                <small className="text-red-500">
                  {errors.cardCode?.message}
                </small>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold text-black">
                Installments
              </label>
              <select
                id="installments"
                className="w-40 px-4 py-3 rounded bg-zinc-200 text-black focus:outline-none"
                {...register("installments")}
              >
                <option value="1">1x of $169.90</option>
                <option value="2">2x of $85.00</option>
                <option value="3">3x of $56.63</option>
              </select>
              <small className="text-red-500">
                {errors.installments?.message}
              </small>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full my-2 font-semibold py-3 px-6 rounded text-white ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isLoading ? "Finalizing purchase..." : "Finalize purchase"}
        </button>
      </div>
    </form>
  );
}
