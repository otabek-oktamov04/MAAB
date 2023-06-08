import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { INews } from "../../shared/interfaces";
import { Link, useNavigate } from "react-router-dom";
import { useNews } from "../../contexts/news.context";
import { useNotification } from "../../contexts";

interface IProps {
  initialValue?: INews;
}

export const NewsForm = ({ initialValue }: IProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<INews>({
    defaultValues: initialValue,
    mode: "onChange",
  });
  const { createNews, updateNews } = useNews();
  const navigate = useNavigate();
  const { showSuccess } = useNotification();

  const onFormSubmit = async (value: INews) => {
    if (initialValue) {
      await updateNews(value);
      navigate("/dashboard/news");
      showSuccess("Yangilik tahrirlandi");
    } else {
      await createNews(value);
      navigate("/dashboard/news");
      showSuccess("Yangilik yaratildi");
    }
    reset();
  };

  return (
    <Box width="80%" px="24px" py="32px" background="white" borderRadius="md">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <FormControl isRequired mb="6">
          <FormLabel>Sarlavha</FormLabel>
          <Input
            {...register("newsContent", {
              required: true,
            })}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Tavsif</FormLabel>
          <Textarea
            height="500px"
            {...register("description", {
              required: true,
            })}
          />
        </FormControl>

        <ButtonGroup mt="6" gap="2" display="flex" justifyContent="end">
          <Button
            as={Link}
            to={"/dashboard/news"}
            type="reset"
            colorScheme="gray"
          >
            Bekor qilish
          </Button>
          <Button isLoading={isSubmitting} type="submit" colorScheme="blue">
            Saqlash
          </Button>
        </ButtonGroup>
      </form>
    </Box>
  );
};

export default NewsForm;
