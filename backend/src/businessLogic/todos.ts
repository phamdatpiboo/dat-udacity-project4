import { TodosAccess } from '../dataLayer/todosAcess'
import { AttachmentUtils } from '../helpers/attachmentUtils';
import { TodoItem } from '../models/TodoItem'
// import { TodoUpdate } from '../models/TodoUpdate';
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
// import * as createError from 'http-errors'

/**
 * TODO: Implement businessLogic
 */
const logger = createLogger('TodosAccess')
const todosAcess = new TodosAccess()
const attachmentUtils = new AttachmentUtils()

/**
 * get todo for user
 * 
 * @param userId 
 * @returns TodoItem
 */
export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
    logger.info('Get todo for user function')
    return todosAcess.getAllTodos(userId)
}

/**
 * creat todo funciton
 * @param newTodo 
 * @param userId 
 * @returns TodoItem
 */
export async function createTodo(
    newTodo: CreateTodoRequest,
    userId: string
    ): Promise<TodoItem> {
        logger.info('Creat todo function')

        const todoId = uuid.v1()
        const createdAt = new Date().toISOString()
        const s3AttachmentUrl = attachmentUtils.getAttachmentUrl(todoId)
        const newItem = {            
            userId,
            todoId,
            createdAt,
            done: false,
            attachmentUrl: s3AttachmentUrl,
            ...newTodo
        }

        return await todosAcess.creatTodoItem(newItem)
}

