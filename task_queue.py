import time
import uuid
import threading
from queue import Queue


class Task():

    def __init__(self, func, *args, **kwargs):
        self.func = func
        self.args = args
        self.kwargs = kwargs
        self.uuid = uuid.uuid1()


class TaskManager():

    def __init__(self):
        super().__init__()
        self.queue = Queue()
        self.registry = {}
        self.worker = Worker(self)
        self.worker.setDaemon(True)
        self.worker.start()

    def create_task(self, obj_id, func, *args, **kwargs):
        task = Task(obj_id, func, *args, **kwargs)
        self.queue.put(task)
        self.registry[task.uuid] = 'waiting'

        return task.uuid

    def get_task_status(self, uuid):
        status = self.registry.get(uuid)
        if status in ('completed', 'failed'):
            del self.registry[uuid]

        return status

    def stop(self):
        self.worker.stop()

    def resume(self):
        self.worker = Worker(self)
        self.worker.start()

    def is_running(self):
        if self.worker is None:
            return False
        else:
            return self.worker.is_alive()

    def clear(self):
        self.worker = None


class Worker(threading.Thread):

    def __init__(self, manager):
        super().__init__()
        self.queue = manager.queue
        self.registry = manager.registry
        self.manager = manager
        self.running = True

    def run(self):
        while self.running:
            print('Пробуем взять')
            task = self.queue.get()
            print('# Берем новое задание:', task.uuid)
            self.registry[task.uuid] = 'running'
            try:
                task.func(*task.args, **task.kwargs)
                self.queue.task_done()
                self.registry[task.uuid] = 'completed'
            except:
                self.queue.task_done()
                self.registry[task.uuid] = 'failed'

        self.manager.clear()

    def stop(self):
        self.running = False

    def __del__(self):
        print('Поток удален')


def example(t, name='empty'):
    print(name, 'begin')
    time.sleep(t)

def bad_example(t, name='empty'):
    print(name, 'begin')
    raise Exception()


manager = TaskManager()

first_task = manager.create_task(example, 3, name='First Task')
second_task = manager.create_task(example, 3, name='Second Task')

print('Статус [First Task]:', manager.get_task_status(first_task))
print('Статус [Second Task]:', manager.get_task_status(second_task))

print('Статус менеджера до паузы (Статус [First Task]: {}): {}'.format(manager.get_task_status(first_task),
                                                                       manager.is_running()))
manager.stop()
print('Статус менеджера после паузы (Статус [First Task]: {}): {}'.format(manager.get_task_status(first_task),
                                                                          manager.is_running()))

time.sleep(5)

print('Статус менеджера после паузы (Статус [First Task]: {}): {}'.format(manager.get_task_status(first_task),
                                                                          manager.is_running()))
manager.resume()
print('Статус менеджера после возобновления:', manager.is_running())

time.sleep(5)

print('Статус First Task:', manager.get_task_status(first_task))
print('Статус Second Task:', manager.get_task_status(second_task))

bad_task = manager.create_task(bad_example, 1, name='Bad Task')

time.sleep(2)
print('Статус Bad Task:', manager.get_task_status(bad_task))
print('Статус First Task:', manager.get_task_status(first_task))
print('Статус Second Task:', manager.get_task_status(second_task))

manager.stop()

time.sleep(5)
last_task = manager.create_task(example, 1, name='Last Task')
