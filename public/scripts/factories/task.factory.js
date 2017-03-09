myApp.factory('TaskFactory', ['$http', function($http) {

  var factoryTasks = { list: [] };

  getTasks();

  //get tasks

  function getTasks() {
    $http({
      method: 'GET',
      url: '/tasks'
    }).then(function(response) {
      console.log('response from factory: ', response);
      console.log('response.data from factory: ', response.data);
      factoryTasks.list = response.data;
    });
  }

  //add task

  function addTask(data) {
    $http({
      method: 'POST',
      url: '/tasks',
      data: data
    }).then(function(response){
      console.log(response);
      getTasks();
    });
  }

  // delete task

  function deleteTask(taskId) {
    $http({
      method: 'DELETE',
      url: '/tasks/' + taskId
    }).then(function(response) {
      getTasks();
    });
  }

  //completeTask

  function completeTask(taskId) {
    // http request moves to factory because it's the glue between the factory and the server
    $http({
      method: 'PUT',
      url: '/tasks/complete/' + taskId
    }).then(function(response) {
      getTasks();
    });
  }


  //uncompleteTask

  function uncompleteTask(taskId) {
    $http({
      method: 'PUT',
      url: '/tasks/uncomplete/' + taskId
    }).then(function(response) {
      getTasks();
    });
  }



  // this is the public API, if it's not in here, your controller won't see it
  return {
    allTasks: factoryTasks,
    completeTask: completeTask,
    deleteTask: deleteTask,
    addTask: addTask,
    uncompleteTask: uncompleteTask
  };
}]);
