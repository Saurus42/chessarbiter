project(Chessarbiter)
cmake_minimum_required(VERSION 3.10)


if(WIN32)
    set(SRC src/Windows)
    set(NODE "./node_modules/node-addon-api/" "/home/saurus/node/include/node/")
elseif(UNIX AND NOT APPLE)
    set(SRC src/Linux)
    set(NODE "./node_modules/node-addon-api/" "/home/saurus/node/include/node/")
else()
    set(SRC src/Macos)
    set(NODE "./node_modules/node-addon-api/" "/home/saurus/node/include/node/")
endif()

add_library(Pawns SHARED ${SRC}/Pawns.cpp)
set_target_properties(Pawns PROPERTIES PREFIX "" SUFFIX ".node")
target_include_directories(Pawns PRIVATE ${CMAKE_JS_INC} ${NODE})
target_link_libraries(Pawns ${CMAKE_JS_LIB})