import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  FormControl,
  FormSelect,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useGetUserRoleList, useUpdateAdmin } from "../../hooks/User/User";
import { toast } from "react-toastify";
import type { CreateAdminProps, UpdateAdminProps } from "../../services/UserApi/UsetApi";
import { useCreateAdmin } from "../../hooks/SuperAdmin/SuperAdmin";

export type AddUserModalProps = {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void | Promise<void>;
  dataToEdit: any;
  refetchUserList: any;
};

const AddUserModal = ({ visible, onClose, dataToEdit, refetchUserList }: AddUserModalProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { data: rolelist } = useGetUserRoleList();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const createUser = useCreateAdmin();
  const updateUser = useUpdateAdmin();
 useEffect(() => {
    if (rolelist) {
      if (!dataToEdit) {
        const role = rolelist?.data?.responseObject.find((x: any) => (x.roleType == 'admin'));
        setForm({
          firstName: "",
          lastName: "",
          email_address: "",
          password: "",
          role: role?._id,
        })
      }
    }
  }, [rolelist])
  useEffect(() => {
    if (dataToEdit) {
      setIsEditing(true);
      setForm({
        firstName: dataToEdit?.firstName,
        lastName: dataToEdit?.lastName,
        email_address: dataToEdit?.email,
        password: dataToEdit?.password,
        role: dataToEdit?.roleID
      });
    }
  }, [dataToEdit]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";

    if (!form.email_address.trim()) {
      newErrors.email_address = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email_address)) {
      newErrors.email_address = "Invalid email format";
    }
 

    if (!form.role) newErrors.role = "Role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email_address: "",
    password: "",
    role: "",
  });

  const handleInput = (e: any) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (!isEditing) {
      const requestObject: CreateAdminProps = {
        firstName: form.firstName.trim(),
        lastName: "",
        email: form.email_address.trim(),
        password: ""
      };
      try {
        await createUser.mutateAsync(requestObject);
        toast.success("User created Successfully!");
        refetchUserList();
        onClose();
      } catch (error: any) {
        toast.error("Something went wrong!");
      }
    } else {
      const requestObject: UpdateAdminProps = {
        firstName: form.firstName,
        lastName: "",
        userId: dataToEdit.id
      };
      try {
        await updateUser.mutateAsync(requestObject);
        toast.success("User updated Successfully!");
        refetchUserList();
        onClose();
      } catch (error: any) {
        toast.error("Something went wrong!");
      }
    }
  };
  const close=()=>{
    setForm({
       firstName: "",
          lastName: "",
          email_address: "",
          password: "",
          role: "",
    })
    onClose();
  }
  return (
    <Modal centered show={visible} onHide={close}  className="common_modal">
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? "Update User" : "Add New User"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <div className="row">
            <div className="col-md-12">
              <FormGroup className="custom_input_filled">
                <FormLabel>Facility Name</FormLabel>
                <FormControl
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleInput}
                  isInvalid={!!errors.firstName}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </FormGroup>
            </div>
 

            <div className="col-md-6">
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormControl
                  type="email"
                  name="email_address"
                  value={form.email_address}
                  onChange={handleInput}
                  disabled={isEditing}
                  isInvalid={!!errors.email_address}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email_address}
                </Form.Control.Feedback>
              </FormGroup>
            </div>

      

            <div className="col-md-6">
              <FormGroup>
                <FormLabel>Role</FormLabel>
                <FormSelect
                  name="role"
                  value={form.role}
                  onChange={handleInput}
                  disabled={isEditing}
                  isInvalid={!!errors.role}
                  required
                >
                  <option value="">Select Role</option>
                  {rolelist?.data?.responseObject
                    ?.filter((data: any) => data.roleType !== 'systemuser')
                    ?.map((element: any) => (
                      <option key={element?._id} value={element?._id}>
                        {element?.name}
                      </option>
                    ))}
                </FormSelect>
                <Form.Control.Feedback type="invalid">
                  {errors.role}
                </Form.Control.Feedback>
              </FormGroup>
            </div>
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {isEditing ? "Update" : "Add User"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUserModal;