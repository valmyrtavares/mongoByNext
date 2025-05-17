import ProductForm from '@/components/Forms/ProductForm';
import ExcelUploader from '@/components/ExcelUploader';
import style from '@/styles/layouts/ProductFormPage.module.scss';
const ProductFormPage = () => {
  return (
    <div className={style.container}>
      <ProductForm />
      <ExcelUploader />
    </div>
  );
};
export default ProductFormPage;
