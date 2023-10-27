import { Movie } from './../models/Movie';
import { User } from '../models/User';
import Container, { Inject, Service } from 'typedi';
import { UserRepository } from '../repository/UserRepository';
import { IUserRepository } from '../repository/Interfaces/IUserRepository';
import { UserDTO } from '../dto/UserDTO';
import { WatchHistoryRepository } from '../repository/WatchHistorRepository';
import { WatchLaterRepository } from '../repository/WatchLaterRepository';
import { MovieFavoriteRepository } from '../repository/MovieFavoriteRepository';
import { MovieFavorite } from '../models/MovieFavorite';
import { WatchHistory } from '../models/WatchHistory';
import { WatchLater } from '../models/WatchLater';
import { MovieDTO } from '../dto/MovieDTO';

@Service()
export class UserService {
	@Inject(() => UserRepository)
	private userRepository!: UserRepository;

	@Inject(() => MovieFavoriteRepository)
	private movieFavoriteRepository!: MovieFavoriteRepository;

	@Inject(() => WatchHistoryRepository)
	private watchHistoryRepository!: WatchHistoryRepository;

	@Inject(() => WatchLaterRepository)
	private watchLaterRepository!: WatchLaterRepository;

	findOneUser = async (searchConditions: any): Promise<UserDTO> => {
		try {
			return UserDTO.userToUserDTO(
				await this.userRepository.findOneUser(searchConditions)
			);
		} catch (err: any) {
			throw new Error(err.message);
		}
	};

	searchUsers = async (
		searchConditions: any,
		page: number,
		pageSize: number
	): Promise<User[]> => {
		try {
			console.log(this.userRepository);
			return this.userRepository.searchUsers(searchConditions, page, pageSize);
		} catch (err: any) {
			throw new Error(err.message);
		}
	};

	saveMovieFavorite = async (userId: number, movieId: number) => {
		try {
			let movieFavorite = await this.movieFavoriteRepository
				.findOneByCondition({
					user_id: userId,
					movie_id: movieId,
				})
				.then(async (movieFavorite) => {
					if (movieFavorite.deleteAt == null) {
						await this.movieFavoriteRepository.restore(movieFavorite);
						return console.log('Da resotre');
					}
				})
				.catch((error) => {
					console.error('Lỗi: ', error);
				});
			return await this.movieFavoriteRepository.save(
				MovieFavorite.build({ userId: userId, movieId: movieId })
			);
		} catch (error: any) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	deleteMovieFavorite = async (userId: number, movieId: number) => {
		try {
			let movieFavorite = await this.movieFavoriteRepository.findOneByCondition(
				{
					user_id: userId,
					movie_id: movieId,
				}
			);
			return await this.movieFavoriteRepository.delete(movieFavorite);
		} catch (error: any) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	findAllMovieFavorite = async (
		userId: number,
		page: number,
		pageSize: number
	) => {
		try {
			const userMovie = await this.movieFavoriteRepository.findAll(
				userId,
				page,
				pageSize
			);
			return new MovieDTO(userMovie!, 'MovieFavorite');
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	saveWatchHistory = async (
		userId: number,
		movieId: number,
		duration: number
	) => {
		try {
			let watchHistory = await this.watchHistoryRepository
				.findOneByCondition({
					user_id: userId,
					movie_id: movieId,
				})
				.then(async (watchHistory) => {
					if (watchHistory.deleteAt == null) {
						await this.watchHistoryRepository.restore(watchHistory);
					}
				})
				.catch((error) => {
					console.error('Lỗi: ', error);
				});
			return await this.watchHistoryRepository.save(
				WatchHistory.build({
					userId: userId,
					movieId: movieId,
					duration: duration,
				})
			);
		} catch (error: any) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	deleteWatchHistory = async (userId: number, movieId: number) => {
		try {
			let watchHistory = await this.watchHistoryRepository.findOneByCondition({
				user_id: userId,
				movie_id: movieId,
			});
			return await this.watchHistoryRepository.delete(watchHistory);
		} catch (error: any) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	findAllWatchHistory = async (
		userId: number,
		page: number,
		pageSize: number
	) => {
		try {
			let userMovie = await this.watchHistoryRepository.findAll(
				userId,
				page,
				pageSize
			);
			return new MovieDTO(userMovie!, 'WatchHistory');
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	saveWatchLater = async (userId: number, movieId: number) => {
		try {
			let watchLater = await this.watchLaterRepository
				.findOneByCondition({
					user_id: userId,
					movie_id: movieId,
				})
				.then(async (watchLater) => {
					if (watchLater.deleteAt == null) {
						await this.watchLaterRepository.restore(watchLater);
					}
				})
				.catch((error) => {
					console.error('Lỗi: ', error);
				});
			return await this.watchLaterRepository.save(
				WatchLater.build({ userId: userId, movieId: movieId })
			);
		} catch (error: any) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	deleteWatchLater = async (userId: number, movieId: number) => {
		try {
			let watchLater = await this.watchLaterRepository.findOneByCondition({
				user_id: userId,
				movie_id: movieId,
			});
			return await this.watchLaterRepository.delete(watchLater);
		} catch (error: any) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	findAllWatchLater = async (
		userId: number,
		page: number,
		pageSize: number
	) => {
		try {
			let userMovie = await this.watchLaterRepository.findAll(
				userId,
				page,
				pageSize
			);
			return new MovieDTO(userMovie!, 'WatchLater');
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
