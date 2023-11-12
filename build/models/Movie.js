"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const Episode_1 = require("./Episode");
const sequelize_typescript_1 = require("sequelize-typescript");
const Genre_1 = require("./Genre");
const MovieGenre_1 = require("./MovieGenre");
const Actor_1 = require("./Actor");
const MovieActor_1 = require("./MovieActor");
const Director_1 = require("./Director");
const MovieDirector_1 = require("./MovieDirector");
let Movie = class Movie extends sequelize_typescript_1.Model {
};
exports.Movie = Movie;
Movie.MOVIE_TABLE_NAME = 'Movies';
Movie.MOVIE_ID = 'movie_id';
Movie.MOVIE_TITLE = 'title';
Movie.MOVIE_DESCRIPTION = 'description';
Movie.MOVIE_RELEASE_DATE = 'release_date';
Movie.MOVIE_NATION = 'nation';
Movie.MOVIE_POSTER_URL = 'poster_url';
Movie.MOVIE_TRAILER_URL = 'trailer_url';
Movie.MOVIE_AVERAGE_RATING = 'average_rating';
Movie.MOVIE_EPISODES = 'episodes';
Movie.MOVIE_LEVEL = 'level';
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Movie.MOVIE_ID,
    })
], Movie.prototype, "movieId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        field: Movie.MOVIE_TITLE,
    })
], Movie.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        field: Movie.MOVIE_DESCRIPTION,
    })
], Movie.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE(),
        field: Movie.MOVIE_RELEASE_DATE,
    })
], Movie.prototype, "releaseDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        field: Movie.MOVIE_NATION,
    })
], Movie.prototype, "nation", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        field: Movie.MOVIE_POSTER_URL,
    })
], Movie.prototype, "posterURL", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        field: Movie.MOVIE_TRAILER_URL,
    })
], Movie.prototype, "trailerURL", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(3, 2),
        field: Movie.MOVIE_AVERAGE_RATING,
    })
], Movie.prototype, "averageRating", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.SMALLINT(),
        field: Movie.MOVIE_EPISODES,
    })
], Movie.prototype, "episodes", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.SMALLINT(),
        field: Movie.MOVIE_LEVEL,
    })
], Movie.prototype, "level", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Genre_1.Genre, () => MovieGenre_1.MovieGenre)
], Movie.prototype, "genres", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Actor_1.Actor, () => MovieActor_1.MovieActor)
], Movie.prototype, "actors", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Director_1.Director, () => MovieDirector_1.MovieDirector)
], Movie.prototype, "directors", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Episode_1.Episode)
], Movie.prototype, "movieEpisodes", void 0);
exports.Movie = Movie = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: Movie.MOVIE_TABLE_NAME,
        timestamps: true,
    })
], Movie);