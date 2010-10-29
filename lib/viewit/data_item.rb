module Viewit
  class DataItem
    attr :input
    
    def initialize input
      @input = input
    end
    
    def eql? other
      return false unless other.is_a? DataItem
      @input.eql?(other.input)
    end
    
    def == other
      return false unless other.is_a? DataItem
      @input == other.input
    end
    
    def hash
      @input.hash
    end
    
    def to_s
      @input.to_s
    end
    
    def self.create input = nil
      case input
      when NilClass
        EmptyData.new input
      when Fixnum, String, TrueClass, FalseClass
        LiteralData.new input
      when Array
        ArrayData.new input
      when Hash
        HashData.new input
      else
        raise "Not supported: #{input.inspect}"
      end
    end
    
    # Special data item class for nil, can be used in place of 
    # HashData or ArrayData
    class EmptyData < DataItem
      def method_missing method, *args
        DataItem.create
      end
      
      def size; 0; end
      def length; 0; end
    end
    
    # number/string/...
    class LiteralData < DataItem
    end
    
    # hash data
    class HashData < DataItem
      def method_missing method, *args
        DataItem.create(@input[method.to_s])
      end
    end
    
    # array
    class ArrayData < DataItem
      def [] index
        DataItem.create(@input[index])
      end
      
      def each
        @input.each do |item|
          yield DataItem.create(item)
        end
      end
      
      def each_with_index
        @input.each_with_index do |item, i|
          yield DataItem.create(item), i
        end
      end
      
      def size; @input.size; end
      def length; @input.length; end
    end
  end
end
