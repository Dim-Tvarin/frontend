import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import type { AppDispatch } from '../../redux/store';
import { verifyUserThunk } from '../../redux/users/usersOperations';
import { selectIsLoggedIn } from '../../redux/users/usersSlice';

const VerifyPage = () => {
  const { verifyToken } = useParams<{ verifyToken: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (verifyToken) {
      dispatch(verifyUserThunk(verifyToken));
    }
  }, [verifyToken, dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return <h1>Йде верифікація, зачекайте...</h1>;
};

export default VerifyPage;
