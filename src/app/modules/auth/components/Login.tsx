import { useForm } from "react-hook-form";
import { ILoginForm } from "../../../shared/interfaces";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext, useNotification } from "../../../contexts";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FormLabel } from "react-bootstrap";

export function Login() {
  const { login } = useAuthContext();
  const { register, handleSubmit } = useForm<ILoginForm>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { showError } = useNotification();

  const onFormSubmit = async (value: ILoginForm) => {
    try {
      setIsLoading(true);
      await login(value);
      navigate("/dashboard");
    } catch (error: any) {
      showError(error?.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="form w-100"
      onSubmit={handleSubmit(onFormSubmit)}
      noValidate
      id="kt_login_signin_form"
    >
      <Heading fontSize="32px" fontWeight="medium" textAlign="center" mb="32px">
        Kirish
      </Heading>

      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="login"
          size="lg"
          mb="4"
          {...register("email", {
            required: true,
          })}
          type="text"
        />
      </FormControl>

      <FormControl mb="24px">
        <FormLabel>Parol</FormLabel>
        <InputGroup display="flex" alignItems="center">
          <Input
            size="lg"
            type={show ? "text" : "password"}
            placeholder="parol"
            {...register("password", {
              required: true,
            })}
          />
          <InputRightElement
            onClick={setShow.bind(null, !show)}
            cursor="pointer"
            height="100%"
          >
            {show ? <ViewOffIcon /> : <ViewIcon />}
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
        <div />
      </div>

      <div className="d-grid">
        <button
          type="submit"
          disabled={isLoading}
          id="kt_sign_in_submit"
          className="btn btn-primary"
        >
          {!isLoading && <span className="indicator-label">Kirish</span>}
          {isLoading && (
            <span
              className="indicator-progress disabled"
              style={{ display: "block" }}
            >
              Kuting...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
