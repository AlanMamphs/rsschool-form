import { FormType } from '../app/store/formDataSlice';
import { FormDataType } from '../schemas';
import { Table } from './Table';

const NewBadge = () => (
  <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400 absolute ml-5">
    <svg
      className="w-2.5 h-2.5 me-1.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
    </svg>
    New
  </span>
);

export const Card = (
  props: {
    type: FormType;
    id: string;
    isNew: boolean;
  } & FormDataType
) => {
  return (
    <div className="text-left">
      {props.isNew && <NewBadge />}
      <div
        className={`flex w-full flex-col m-5 bg-white border border-gray-200 rounded-lg shadow md:flex-row dark:border-gray-700 dark:bg-gray-800 justify-around`}
      >
        <img
          className="object-cover w-full max-w-2xl rounded-t-lg h-96 md:rounded-none md:rounded-s-lg"
          src={props.image as string}
          alt="profile picture"
        />
        <div className="flex grow-1 flex-col justify-between p-4 leading-normal">
          <Table className="w-full">
            <Table.Body>
              <Table.Row>
                <Table.Cell className="font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                  TYPE
                </Table.Cell>
                <Table.Cell>{props.type}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                  Name
                </Table.Cell>
                <Table.Cell>{props.name}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                  Age
                </Table.Cell>
                <Table.Cell>{props.age}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                  Gender
                </Table.Cell>
                <Table.Cell>{props.gender}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                  Contry
                </Table.Cell>
                <Table.Cell>{props.country}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};
