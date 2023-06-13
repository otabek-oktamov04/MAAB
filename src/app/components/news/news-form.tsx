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
import { Editor } from "@tinymce/tinymce-react";

interface IProps {
  initialValue?: INews;
}

export const NewsForm = ({ initialValue }: IProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
    setValue,
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

  const EditorField: React.FC<{ name: string; defaultValue?: string }> = ({
    name,
    defaultValue,
  }) => {
    const handleEditorChange = (content: string) => {
      setValue("description", content);
    };

    return (
      <Editor
        apiKey="rnh0axi8gittbak67atz4djjsqyy01qe3iqkqphghk5dsdaj"
        value={defaultValue}
        onEditorChange={handleEditorChange}
        plugins={
          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tableofcontents footnotes mergetags autocorrect typography inlinecss"
        }
        toolbar="undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat"
      />
    );
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
          <EditorField name={""} defaultValue={initialValue?.description} />
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
