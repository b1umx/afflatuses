import time
import uuid
import threading
from queue import Queue


class Task():

    def __init__(self, obj_id, function, *args, **kwargs):
        self.obj_id = obj_id
        self.function = function
        self.args = args
        self.kwargs = kwargs
        self.uuid = uuid.uuid1()


class TaskManager():

    def __init__(self):
        super().__init__()
        self.queue = Queue()
        self.registry = {}
        self.worker = Worker(self.queue, self.registry)
        self.worker.setDaemon(True)
        self.worker.start()

    def create_task(self, obj_id, function, *args, **kwargs):
        task = Task(obj_id, function, *args, **kwargs)
        self.queue.put(task)
        self.registry[task.uuid] = 'waiting'

        return task.uuid

    def get_task_status(self, uuid):
        status = self.registry.get(uuid)
        if status == 'completed':
            del self.registry[uuid]

        return status


class Worker(threading.Thread):

    def __init__(self, queue, registry):
        super().__init__()
        self.queue = queue
        self.registry = registry

    def run(self):
        while True:
            task = self.queue.get()
            self.registry[task.uuid] = 'running'
            try:
                task.function(*task.args, **task.kwargs)
                self.queue.task_done()
                self.registry[task.uuid] = 'completed'
            except:
                self.queue.task_done()
                self.registry[task.uuid] = 'failed'


def example(t, name='empty'):
    print(name, 'begin')
    time.sleep(t)

def bad_example(t, name='empty'):
    print(name, 'begin')
    raise Exception()


manager = TaskManager()

long_task = manager.create_task(1, example, 5, name='Long Task')
wait_task = manager.create_task(2, example, 1, name='Wait Task')

print('Статус Long Task:', manager.get_task_status(long_task))
print('Статус Wait Task:', manager.get_task_status(wait_task))

time.sleep(10)

print('Статус Long Task:', manager.get_task_status(long_task))
print('Статус Wait Task:', manager.get_task_status(wait_task))

bad_task = manager.create_task(3, bad_example, 1, name='Bad Task')

time.sleep(2)
print('Статус Bad Task:', manager.get_task_status(bad_task))
print('Статус Long Task:', manager.get_task_status(long_task))
print('Статус Wait Task:', manager.get_task_status(wait_task))
