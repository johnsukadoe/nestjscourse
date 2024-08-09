import { Controller, Get, Param, Post, Delete, Patch } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
	@Get()
	getAll(){
		return 'all films'
	}
	
	@Get('/:id')
	getOne(@Param('id') id:string){
		return id
	}
	
	@Post()
	create(){
		return 'created'
	}
	
	@Delete('/:id')
	remove(@Param('id') id:string){
		return `deleted ${id}`
	}
	
	@Patch('/:id')
	update(@Param('id') id:string){
		return `updated ${id}`
	}
}
