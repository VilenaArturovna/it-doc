const staffRoot = 'staff';
const warehouseItemRoot = 'warehouses';
const providerRoot = 'provider';
const vendorRoot = 'vendors';
const workRoot = 'works';
const clientRoot = 'clients';
const orderRoot = 'orders';
const orderById = (id: string) => `${orderRoot}/${id}`;
const deadlineRoot = 'deadlines';
const tasksRoot = 'tasks';
const taskById = (id: string) => `${tasksRoot}/${id}`;

export const routes = {
  staff: {
    root: staffRoot,
    byId: (id: string) => `${staffRoot}/${id}`,
    getMe: 'get-me',
    auth: {
      login: 'login',
    },
  },
  warehouseItem: {
    root: warehouseItemRoot,
    byId: (id: string) => `${warehouseItemRoot}/${id}`,
  },
  provider: {
    root: providerRoot,
    byId: (id: string) => `${providerRoot}/${id}`,
  },
  vendor: {
    root: vendorRoot,
    byId: (id: string) => `${vendorRoot}/${id}`,
  },
  work: {
    root: workRoot,
    byId: (id: string) => `${workRoot}/${id}`,
  },
  client: {
    root: clientRoot,
    byId: (id: string) => `${clientRoot}/${id}`,
  },
  order: {
    root: orderRoot,
    byId: (id: string) => orderById(id),
    putInQueueForDiagnostics: (id: string) => `${orderById(id)}/in-queue-for-diagnostics`,
    certificateOfTechnicalCondition: (id: string) => `${orderById(id)}/certificate-of-technical-condition`,
    startDiagnostic: (id: string) => `${orderById(id)}/start-diagnostic`,
    diagnosed: (id: string) => `${orderById(id)}/diagnosed`,
    approved: (id: string) => `${orderById(id)}/approved`,
    takeToWork: (id: string) => `${orderById(id)}/take-to-work`,
    ready: (id: string) => `${orderById(id)}/ready`,
    complete: (id: string) => `${orderById(id)}/complete`,
    infoForClient: `info-about-order`,
  },
  deadline: {
    root: deadlineRoot,
    byId: (id: string) => `${deadlineRoot}/${id}`,
  },
  task: {
    root: tasksRoot,
    byId: (id: string) => taskById(id),
    addComment: (id: string) => `${taskById(id)}/comment`,
    complete: (id: string) => `${taskById(id)}/complete`,
    markAsRead: (id: string) => `${taskById(id)}/mark-as-read`,
    takeToWork: (id: string) => `${taskById(id)}/take-to-work`,
  },
};
