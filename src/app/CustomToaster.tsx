import toast, { resolveValue, Toaster, ToastType } from 'react-hot-toast';

export function CustomToaster() {
  return (
    <Toaster position="bottom-center">
      {(t) => {
        const classes = mapTypeToClasses(t.type);
        return (
          <div className={`max-w-xs ${classes.container} flex`} role="alert">
            <div className="flex p-4">
              <p className="text-sm text-white">{resolveValue(t.message, t)}</p>

              <div className="ms-auto pl-2">
                <button
                  className={`inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg opacity-70 hover:opacity-100 focus:outline-none focus:opacity-100 ${classes.closeButton}`}
                  onClick={() => toast.dismiss(t.id)}
                  type="button"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );
      }}
    </Toaster>
  );
}

const mapTypeToClasses = (type?: ToastType) => {
  switch (type) {
    case 'error':
      return {
        container:
          'max-w-xs bg-red-500 text-sm text-white rounded-xl shadow-lg',
        closeButton:
          'inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg text-white hover:text-white opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100',
      };
    case 'success':
      return {
        container:
          'max-w-xs bg-green-500 text-sm text-white rounded-xl shadow-lg',
        closeButton:
          'inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg text-white hover:text-white opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100',
      };
    case 'custom':
      return {
        container:
          'max-w-xs bg-yellow-500 text-sm text-white rounded-xl shadow-lg',
        closeButton:
          'inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg text-white hover:text-white opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100',
      };
    case 'blank':
      return {
        container:
          'max-w-xs bg-gray-500 text-sm text-white rounded-xl shadow-lg dark:bg-gray-700',
        closeButton:
          'inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg text-white hover:text-white opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100',
      };
    default:
      return {
        container:
          'max-w-xs bg-gray-800 text-sm text-white rounded-xl shadow-lg dark:bg-gray-900',
        closeButton:
          'inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg text-white hover:text-white opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100',
      };
  }
};
