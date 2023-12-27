import { signInWithEmailAndPassword } from "firebase/auth";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { auth } from "../hook/useFirebaseAuth";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
const Signin = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    signInWithEmailAndPassword(auth, values.username, values.password)
      .then((userCredential) => {
        console.log(userCredential._tokenResponse.idToken);
        localStorage.setItem("token", userCredential._tokenResponse.idToken);
        localStorage.setItem(
          "refresh_token",
          userCredential._tokenResponse.refreshToken
        );
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Form
        name="normal_login"
        className="login-form bg-gray-500 p-10 shadow-2xl rounded-2xl flex flex-col items-center"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <h1 className="text-3xl pb-5">BED TRACKING</h1>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item className="flex justify-center">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button bg-blue-600"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signin;
