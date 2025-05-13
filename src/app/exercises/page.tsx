import BuilderExercises from '@/components/BuilderExercises';
import UserForm from '@/components/UserForm';
import '@/styles/globals.scss';

const Exercises = () => {
  return (
    <div className="container">
      <BuilderExercises />
      <UserForm />
    </div>
  );
};

export default Exercises;
