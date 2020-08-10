import {Request, Response} from 'express'

import db from '../database/connection';
import convertHourToMinuts from '../utils/convertHourToMinuts';

interface ScheduleItem{
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {

  async index(request: Request, response: Response) {
    // 3 filtros, dia, materia, horario

    const filters = request.query;
    const week_day = filters.week_day as string
    const subject = filters.subject as string
    const time = filters.time as string

    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filter to search classes'
      })
    }
    const timeInMinuts = convertHourToMinuts(time) // time é uma string => as string
    const classes = await db('classes').
      whereExists(function () {
        this.select('class_schedule.*').from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule` . `from` <= ??', [timeInMinuts])
          .whereRaw('`class_schedule` . `to` > ??', [timeInMinuts])  
    }).where('classes.subject', '=', subject).
      join('users', 'classes.user_id', '=', 'users.id').
    select(['classes.*', 'users.*']);

    return response.json(classes)
  }





  async create (request: Request, response: Response){ 
    const {
      name, 
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body;
  
    const trx = await db.transaction(); // inicio da transação
  
    try {
      const insertedUsersIds = await trx('users').insert({
        name: name, // se o nome da propriedade é o mesmo nome do valor pode omitir
        avatar,
        whatsapp,
        bio,
      })
      const user_id = insertedUsersIds[0];
    
    const insertedClassesId = await trx('classes').insert({
        subject,
        cost,
        user_id,
      })
    
      const class_id = insertedClassesId[0];
      // temos que converter string para inteiro
      // converter o horario para minutos
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinuts(scheduleItem.from),
          to: convertHourToMinuts(scheduleItem.to),
        };
      }) // percorrer schedule
    
      await trx('class_schedule').insert(classSchedule);
      
      await trx.commit(); // inserir studo no banco
      
      return response.status(201).send(); // criado com sucesso
    } catch (err) {
      await trx.rollback();// se deu algum erro, desfaz
      return response.status(400).json({
        error: 'Unespected erros while creating new class'
      })
    }
  }
}