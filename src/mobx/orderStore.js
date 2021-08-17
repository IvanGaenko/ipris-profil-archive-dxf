// Imports
import { makeObservable, observable, action, computed, autorun } from 'mobx';

class OrderStore {
  orderId = 1;

  orders = [];

  currentOrder = {};

  searchValue = '';

  isEmptyFilteredData = false;

  notification = {
    open: false,
    status: '',
    value: '',
  };

  constructor() {
    makeObservable(this, {
      orders: observable,
      currentOrder: observable,
      orderId: observable,
      searchValue: observable,
      isEmptyFilteredData: observable,
      notification: observable,
      addBook: action,
      loadingCurrentOrder: action,
      updateCurrentOrder: action,
      addOrder: action,
      createNewBlank: action,
      removeOrder: action,
      removeAllOrders: action,
      selectCurrentOrder: action,
      showNotification: action,
      closeNotification: action,
      emptyFilterChecker: action,
      filesToSave: computed,
      getFilesToSave: action,
      onChangeSearchValue: action,
      changeSortDirection: action,
      filteredCurrentOrderData: computed,
      sortTableData: computed,
    });
    autorun(this.checkForEmptyCurrentOrder);
  }

  loadingCurrentOrder = ({ _id, value }) => {
    const updatedOrders = this.orders.map((order) => {
      if (order.id === _id) {
        return {
          ...order,
          isLoading: value,
        };
      }

      return order;
    });

    this.orders = updatedOrders;
    this.currentOrder.isLoading = value;
  };

  addOrder = ({ value, _id }) => {
    // value: name: {fullName, shortName},data: [{Num,Name,Definion,Count,Prev,Operations,Next,data,archiveFileName,archiveFilePath}]
    const addObj = {
      ...value,
      name: value.name,
      id: _id,
      isParsed: true,
      tableSort: {
        order: 'asc',
        orderBy: 'Num',
      },
    };
    this.currentOrder = addObj;

    const newOrders = this.orders.map((order) => {
      if (order.id === _id) {
        return {
          ...order,
          name: value.name,
          data: value.data,
          isParsed: true,
          tableSort: {
            order: 'asc',
            orderBy: 'Num',
          },
        };
      }

      return order;
    });
    this.orders = newOrders;
  };

  updateCurrentOrder = ({ _id, value }) => {
    const updatedOrders = this.orders.map((order) => {
      if (order.id === _id) {
        return {
          ...order,
          data: value.data,
        };
      }

      return order;
    });

    this.orders = updatedOrders;
    this.currentOrder.data = value.data;
  };

  createNewBlank = () => {
    const blankId = this.orderId;
    const newBlack = {
      id: blankId,
      name: {
        shortName: `${blankId}`,
        fullName: `${blankId}`,
      },
      data: [],
      isParsed: false,
      isLoading: false,
    };
    this.currentOrder = newBlack;
    this.orders.push(newBlack);
    this.orderId += 1;
  };

  checkForEmptyCurrentOrder = () => {
    if (this.currentOrder.data === undefined) {
      this.createNewBlank();
    }
  };

  removeOrder = (id) => {
    const orderIndex = this.orders.findIndex((order) => order.id === id);
    const orderPosition = orderIndex + 1;
    const orderLength = this.orders.length;
    const newOrderIndex =
      orderPosition === orderLength ? orderIndex - 1 : orderIndex + 1;

    const nextOrder = this.orders.find(
      (order, index) => index === newOrderIndex,
    );

    const updatedOrders = this.orders.filter((order) => order.id !== id);
    this.orders = updatedOrders;

    if (this.orders.length !== 0 && this.currentOrder.id === id) {
      this.currentOrder = nextOrder;
    }

    if (this.orders.length === 0 && this.currentOrder.id === id) {
      this.removeAllOrders();
    }
  };

  selectCurrentOrder = (id) => {
    const findOrder = this.orders.find((order) => order.id === id);
    this.currentOrder = findOrder;
  };

  removeAllOrders = () => {
    this.orders = [];
    this.orderId = 1;
    this.createNewBlank();
  };

  menuCommands = (name) => {
    switch (name) {
      case 'createOrder':
        this.createNewBlank();
        break;
      case 'closeOrder':
        this.removeOrder(this.currentOrder.id);
        break;
      case 'closeAllOrders':
        this.removeAllOrders();
        break;
      default:
        break;
    }
  };

  getFilesToSave = () => {
    const { data, name } = this.currentOrder;

    return {
      name: name.fullName,
      data: JSON.stringify(data),
    };
  };

  showNotification = (value) => {
    this.notification.open = true;
    this.notification.status = value.status;
    this.notification.value = value.value;
  };

  closeNotification = () => {
    const closedNotification = {
      open: false,
      status: '',
      value: '',
    };
    this.notification = closedNotification;
  };

  onChangeSearchValue = (value) => {
    this.searchValue = value.toLowerCase();
  };

  emptyFilterChecker = (arg) => {
    this.isEmptyFilteredData = arg;
  };

  get filteredCurrentOrderData() {
    if (this.searchValue === '') {
      this.emptyFilterChecker(false);

      return this.currentOrder.data;
    }

    const filteredList = this.currentOrder.data.filter((order) => {
      const isMatchByName = order.Name.toLowerCase().includes(this.searchValue);

      const isMatchByDefinion = order.Definion.toLowerCase().includes(
        this.searchValue,
      );

      return isMatchByName || isMatchByDefinion;
    });

    if (filteredList.length) {
      this.emptyFilterChecker(false);

      return filteredList;
    }

    if (filteredList.length === 0 && this.searchValue !== '') {
      this.emptyFilterChecker(true);

      return this.currentOrder.data;
    }
    this.emptyFilterChecker(false);

    return this.currentOrder.data;
  }

  get sortTableData() {
    const newArr = JSON.parse(JSON.stringify(this.filteredCurrentOrderData));
    const { order, orderBy } = this.currentOrder.tableSort;
    const sortedData = newArr.sort((a, b) => {
      let sortValue = 0;

      if (order === 'asc') {
        if (a[orderBy] > b[orderBy]) sortValue = 1;

        if (a[orderBy] < b[orderBy]) sortValue = -1;

        if (a[orderBy] === b[orderBy]) sortValue = 0;
      }

      if (order === 'desc') {
        if (a[orderBy] < b[orderBy]) sortValue = 1;

        if (a[orderBy] > b[orderBy]) sortValue = -1;

        if (a[orderBy] === b[orderBy]) sortValue = 0;
      }

      return sortValue;
    });

    if (sortedData.length) return sortedData;

    return this.filteredCurrentOrderData;
  }

  changeSortDirection = ({ _id, _order, _orderBy }) => {
    const updatedOrders = this.orders.map((order) => {
      if (order.id === _id) {
        return {
          ...order,
          tableSort: {
            order: _order,
            orderBy: _orderBy,
          },
        };
      }

      return order;
    });

    this.orders = updatedOrders;
    this.currentOrder = {
      ...this.currentOrder,
      tableSort: {
        order: _order,
        orderBy: _orderBy,
      },
    };
  };
}

export default OrderStore;
