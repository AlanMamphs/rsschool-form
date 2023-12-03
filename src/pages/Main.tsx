import { Link } from 'react-router-dom';
import { FormType } from '../app/store/formDataSlice';
import { useFormDataSelector } from '../app/store/selectors';
import { Card } from '../components/Card';
export const MainPage = () => {
  const formData = useFormDataSelector();
  return (
    <div className="w-full flex gap-2">
      <div className="flex-1">
        <h2 className="text-2xl">Controlled</h2>
        {!formData.length && (
          <p className="my-10">
            {' '}
            No data.{' '}
            <Link className="text-blue underline" to="/controlled">
              Submit via controlled form
            </Link>
          </p>
        )}

        {formData
          .filter((v) => v.type === FormType.controlled)
          .map((v) => (
            <Card key={v.id} {...v} />
          ))}
      </div>
      <div className="flex-1">
        <h2 className="text-2xl">Uncontrolled</h2>
        {!formData.length && (
          <p className="my-10">
            {' '}
            No data.{' '}
            <Link className="text-blue underline" to="/uncontrolled">
              Submit via uncontrolled form
            </Link>
          </p>
        )}
        {formData
          .filter((v) => v.type === FormType.uncontrolled)
          .map((v) => (
            <Card key={v.id} {...v} />
          ))}
      </div>
    </div>
  );
};
