import { SFC } from 'react';
import { Transition } from '@headlessui/react';

type colorTypes = "red"|"blue";

interface IModalAlert {
  title: string;
  message: string;
  confirmButtonText: string;
  isOpen: boolean;
  btnColor: colorTypes;
  callbackOkClick: () => void;
}

const ModalAlert:SFC<IModalConfirm> = ({isOpen, title, message, confirmButtonText, btnColor, callbackOkClick}) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Transition
          show={isOpen}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <Transition
            show={isOpen}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {title}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm leading-5 text-gray-500">
                        {message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3">
                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                  <button
                    onClick={callbackOkClick}
                    type="button"
                    className={`inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-${btnColor}-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-${btnColor}-500 focus:outline-none focus:border-${btnColor}-700 focus:shadow-outline-${btnColor} transition ease-in-out duration-150 sm:text-sm sm:leading-5`}>
                    {confirmButtonText}
                  </button>
                </span>
              </div>
            </div>
          </Transition>
        </Transition>
      </div>
    </div>
  )
}

export default ModalAlert;
