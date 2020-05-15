project(Chessarbiter)
cmake_minimum_required(VERSION 3.10)

set(NODE "./node_modules/node-addon-api/")

add_library(Pawns SHARED src/Pawns.cpp)
set_target_properties(Pawns PROPERTIES PREFIX "" SUFFIX ".node")
target_include_directories(Pawns PRIVATE ${CMAKE_JS_INC} ${NODE})
target_link_libraries(Pawns ${CMAKE_JS_LIB})

add_library(Player SHARED src/Player.cpp)
set_target_properties(Player PROPERTIES PREFIX "" SUFFIX ".node")
target_include_directories(Player PRIVATE ${CMAKE_JS_INC} ${NODE})
target_link_libraries(Player ${CMAKE_JS_LIB})