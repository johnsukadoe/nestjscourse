import { Controller, Get, Param, Post, Delete, Body, Patch } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { MoviesService } from './movies.service'
import { Movie } from './entities/movie.entity'

@Controller('movies')
export class MoviesController {
	constructor(private readonly moviesService:MoviesService){}
	
	@Get()
	getAll():Movie[] {
		return this.moviesService.getAll()
	}
	@Post()
	create(@Body() data:CreateMovieDto){
		return this.moviesService.create(data)
	}
	// @Get('search')
	// search(@Query('year') year:string){
	// 	return `searching ${year}`
	// }
	@Get('/:id')
	getOne(@Param('id') id:number):Movie{
		return this.moviesService.getOne(id)
	}
	
	
	
	@Delete('/:id')
	remove(@Param('id') id:number){
		return this.moviesService.remove(id)
	}
	
	@Patch('/:id')
	update(@Param('id') id:number, @Body() data:UpdateMovieDto){
		return this.moviesService.update(id, data)
	}
}
