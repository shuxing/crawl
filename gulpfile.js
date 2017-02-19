'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');
const shell = require('gulp-shell');

gulp.task('lint', () => {
    return gulp.src(['src/**/*.js', 'tests/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('test', () => {
    return gulp.src('tests/**/*.js', { read: false })
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('tdd', ['test'],  () => {
    return gulp.watch(['src/**/*.js', 'tests/**/*.js'], ['test']);
});

gulp.task('start', shell.task(['npm start']));

gulp.task('dev', ['lint', 'tdd']);
gulp.task('run', ['lint', 'start']);
gulp.task('default', ['lint', 'test', 'start']);
