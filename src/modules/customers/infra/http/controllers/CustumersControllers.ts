import { Request, Response } from "express";
import ListCustomersService from "../../../services/ListCustomersService";
import ShowCustomerService from "../../../services/ShowCustomerService";
import { CreateCustomerService } from "../../../services/CreateCustomerService";
import UpdateCustomerService from "../../../services/UpdateCustomerService";
import DeleteCustomerService from "../../../services/DeleteCustomerService";
import { customerRepository } from "../../database/repositories/CustomerRepositories";

export default class CustomersControllers {
  async index(request: Request, response: Response): Promise<Response> {

    const page = parseInt(request.query.page as string) || 1;
    const limit = parseInt(request.query.limit as string) || 10;

    const listCustomers = new ListCustomersService(customerRepository);
    const customers = await listCustomers.execute(page, limit);

    return response.json(customers);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showCustomer = new ShowCustomerService(customerRepository);
    const customer = await showCustomer.execute({ id: Number(id) });
    return response.json(customer);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const createCustomer = new CreateCustomerService(customerRepository);
    const customer = await createCustomer.execute({
      name,
      email
     });
    return response.json(customer);
  }

  async update(request: Request, response: Response): Promise<Response> {
       const { name, email } = request.body;
       const id  = Number(request.params.id);
      const updateCustomer = new UpdateCustomerService(customerRepository);
       const customer = await updateCustomer.execute({
         id,
         name,
         email
        });
       return response.json(customer);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);
    const deleteCustomer = new DeleteCustomerService(customerRepository);
    await deleteCustomer.execute({ id });
    return response.status(204).json([]);
  }
}
